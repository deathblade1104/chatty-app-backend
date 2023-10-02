import { Request, Response, NextFunction, Application, json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import compression from 'compression';
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';
import utils from './core/utils/index';
import config from './config';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import appRoutes from './routes';
import IErrorResponse from './core/globals/errors/interfaces/IErrorResponse.interface';
import CustomError from './core/globals/errors/abstractClasses/CustomError';

const serverPort = 5001;

class ChattyServer {
  static className = 'ChattyServer';
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  private securityMiddleware(app: Application): void {
    if (typeof config.SECRET_KEY_ONE !== 'string' || typeof config.SECRET_KEY_TWO !== 'string') return;
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE, config.SECRET_KEY_TWO],
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV !== 'development'
      })
    );

    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    // Handle URLs that don't exist
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      utils.logErrorWithContext(error, ChattyServer.className, 'globalErrorHandler');
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializationErrors());
        return;
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnections();
    } catch (error) {
      utils.logErrorWithContext(error, ChattyServer.className, 'startServer', 'setupServer');
      throw error;
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(serverPort, () => {
      const logger = config.createLogger('setupServer');
      logger.info('Server Started!');
      logger.info(`Visit :  http://localhost:${serverPort}/`);
    });
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    try {
      const io = new Server(httpServer, {
        cors: {
          origin: config.CLIENT_URL,
          methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
        }
      });

      const pubClient = createClient({ url: config.REDIS_HOST });
      const subClient = pubClient.duplicate();
      await Promise.all([pubClient.connect(), subClient.connect()]);
      io.adapter(createAdapter(pubClient, subClient));
      return io;
    } catch (err) {
      utils.logErrorWithContext(err, ChattyServer.className, 'createSocketIO', 'setupServer');
      throw err;
    }
  }

  private socketIOConnections(): void {}

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
    this.securityMiddleware(this.app);
    this.securityMiddleware(this.app);
  }
}

export default ChattyServer;

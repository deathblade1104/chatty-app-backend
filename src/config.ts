import dotenv from 'dotenv';
import utils from './core/utils';
import bunyan, { LogLevel } from 'bunyan';

dotenv.config({});

class Config {
  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend';

  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  public validateConfig(): void {
    let errorMessage: string = '';

    for (const [key, value] of Object.entries(this)) {
      if (utils.isUndefined(value, true)) {
        errorMessage += `${key} is undefined in Config. `;
      }
    }

    if (!utils.isUndefined(errorMessage, true)) {
      errorMessage += "Can't Start Server.";
      throw new Error(errorMessage);
    }
  }

  public createLogger(name: string, level: LogLevel = 'info'): bunyan {
    return bunyan.createLogger({ name, level });
  }
}

export default new Config();

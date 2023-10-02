import mongoose from 'mongoose';
import utils from './core/utils';
import config from './config';

export default async () => {
  const logger = config.createLogger('database');
  const connect = async () => {
    try {
      if (typeof config.DATABASE_URL !== 'string') return;

      await mongoose.connect(config.DATABASE_URL);
      logger.info('Connection to MongoDB is established Successfully');
    } catch (err) {
      utils.logErrorWithContext(
        err,
        'SetupDatabase',
        'connect',
        'database',
        ' while establishing connection to MongoDB'
      );
      return process.exit(1);
    }
  };
  await connect();
  mongoose.connection.on('disconnected', async () => {
    logger.info('MongoDB Disconnected , attempting to reconnect.');
    await connect();
  });
};

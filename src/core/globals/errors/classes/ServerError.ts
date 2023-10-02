import CustomError from '../abstractClasses/CustomError';
import HTTP_STATUS from 'http-status-codes';

export default class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

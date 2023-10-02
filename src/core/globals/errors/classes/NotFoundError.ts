import CustomError from '../abstractClasses/CustomError';
import HTTP_STATUS from 'http-status-codes';

export default class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

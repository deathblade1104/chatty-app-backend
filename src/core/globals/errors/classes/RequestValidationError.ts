import utils from '../../../utils';
import CustomError from '../abstractClasses/CustomError';
import HTTP_STATUS from 'http-status-codes';

export default class RequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string = '') {
    let errorMessage = 'Invalid Request';
    if (utils.isUndefined(message, true)) {
      errorMessage += message;
    }
    super(errorMessage);
  }
}

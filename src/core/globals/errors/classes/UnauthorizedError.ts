import utils from '../../../utils';
import CustomError from '../abstractClasses/CustomError';
import HTTP_STATUS from 'http-status-codes';

export default class UnauthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string = '') {
    let errorMessage = 'User Unauthorized.';
    if (!utils.isUndefined(message, true)) errorMessage += message;
    super(errorMessage);
  }
}

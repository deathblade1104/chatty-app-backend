import utils from '../../../utils';
import CustomError from '../abstractClasses/CustomError';
import HTTP_STATUS from 'http-status-codes';

export default class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string = '') {
    let errorMessage = 'File Size is too large , to be uploaded.';
    if (utils.isUndefined(message, true)) {
      errorMessage += message;
    }
    super(errorMessage);
  }
}

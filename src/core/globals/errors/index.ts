import BadRequestError from './classes/BadRequestError';
import MissingParameterError from './classes/MissingParameterError';
import UnauthorizedError from './classes/UnauthorizedError';
import FileTooLargeError from './classes/FileTooLargeError';
import NotFoundError from './classes/NotFoundError';
import ServerError from './classes/ServerError';

const Errors = {
  BadRequestError,
  MissingParameterError,
  UnauthorizedError,
  FileTooLargeError,
  NotFoundError,
  ServerError
};

export default Errors;

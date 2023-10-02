import BadRequestError from './BadRequestError';

export default class MissingParameterError extends BadRequestError {
  constructor(paramNames: string[] = []) {
    let message = 'One or More Parameters are Missing.';
    if (paramNames.length > 0) {
      message += `Names of those Params are : ${paramNames.join(',')}`;
    }
    super(message);
  }
}

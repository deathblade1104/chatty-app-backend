import isUndefined from './isUndefined';

const getErrorMessage = (err: any): string => {
  let message = 'Internal Server Error';
  if (!isUndefined(err)) {
    message = err.message || JSON.stringify(err);
  }
  return message;
};

export default getErrorMessage;

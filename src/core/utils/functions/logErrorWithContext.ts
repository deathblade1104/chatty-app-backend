import getErrorMessage from './getErrorMessage';
import config from '../../../config';

const logErrorMessages = (
  err: any,
  className: string,
  functionName: string,
  loggerName = 'setupServer',
  context = ''
): void => {
  const errorTemplate = 'Error occurred in ${className}.${functionName}(): ${err}${context}.';
  const logger = config.createLogger(loggerName, 'error');
  logger.error(
    errorTemplate
      .replace('${className}', className)
      .replace('${functionName}', functionName)
      .replace('${err}', getErrorMessage(err))
      .replace('${context}', context)
  );
};

export default logErrorMessages;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Errors from '../errors';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import utils from '../../utils';

const joiValidationMiddleWare =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      let errorMessage = utils.getErrorMessage(error);
      if (error.details && error.details.length > 0) {
        errorMessage = error.details[0].message;
      }
      next(new Errors.RequestValidationError(errorMessage));
    }
  };

export default joiValidationMiddleWare;

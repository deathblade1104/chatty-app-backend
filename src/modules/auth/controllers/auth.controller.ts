import { Request, Response, NextFunction, Router } from 'express';
import joiValidationMiddleWare from '../../../core/globals/middlewares/joiValidation.middleware';
import signupSchema from '../schemas/signup.schema';
import utils from '../../../core/utils';
import authService from '../services/auth.service';
import Errors from '../../../core/globals/errors';

class AuthController {
  static className: string = 'AuthController';

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, email, password, avatarColor, avatarImage } = req.body;
      if (!utils.isUndefined(authService.getUserByEmailOrUserName(username, email))) {
        throw new Errors.BadRequestError(
          `User already exists with same username ${username} or email ${email}. Please try signing in.`
        );
      }
      res.status(200).send({
        message: 'success',
        data: {
          password,
          avatarColor,
          avatarImage
        }
      });
    } catch (error) {
      next(error);
    }
  }

  init(app: Router): void {
    app.post('/api/createuser', joiValidationMiddleWare(signupSchema), this.createUser);
  }
}

export default new AuthController();

import AuthController from './controllers/auth.controller';
import { Router } from 'express';

export default {
  init(app: Router): void {
    AuthController.init(app);
  }
};

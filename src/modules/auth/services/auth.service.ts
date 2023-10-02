import { FilterQuery } from 'mongoose';
import { IAuthDocument } from '../interfaces/auth.interface';
import AuthModel from '../models/auth.model';

class AuthService {
  async getUserByEmailOrUserName(
    username: string | null,
    email?: string | null
  ): Promise<IAuthDocument | null | undefined> {
    try {
      const query: FilterQuery<IAuthDocument> = {
        $or: [{ username: username }, { email: email }]
      };
      const user: IAuthDocument | null = await AuthModel.findOne(query).exec();
      return user;
    } catch (err) {
      return;
    }
  }
}
export default new AuthService();

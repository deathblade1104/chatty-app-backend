import IError from './IError.interface';

export default interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializationErrors(): IError;
}

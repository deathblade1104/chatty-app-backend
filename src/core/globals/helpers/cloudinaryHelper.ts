import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import utils from '../../utils';

class CloudinaryHelper {
  cloudinaryUploadHelper(
    file: string,
    publicId?: string,
    overwrite?: boolean,
    invalidate?: boolean
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          public_id: publicId,
          overwrite,
          invalidate
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (!utils.isUndefined(error)) {
            reject(error);
          }

          resolve(result);
        }
      );
    });
  }
}

export default new CloudinaryHelper();

import { resolve } from "path";

const getValidationError = async (schema: any, info: object) => {
  const getError = () => {
    return new Promise<Record<string, string> | null>((resolve, reject) => {
      schema
        .validate(info, { abortEarly: false })
        .then(() => {
          resolve(null);
        })
        .catch(function (errors: any) {
          let error: Record<string, string> = {};
          errors.inner.forEach((err: { path: string; message: string }) => {
            error[err.path] = err.message;
          });

          resolve(error);
        });
    });
  };

  const errors = await getError();
  return errors;
};

export default getValidationError;

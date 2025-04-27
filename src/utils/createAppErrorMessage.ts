import { isAxiosError } from "axios";

export const createAppErrorMessage = (error: any) => {
  let errMessage = "";

  if (isAxiosError(error)) {
    if (error.response!.status >= 500) errMessage = "Something bad happened!";
    else if (error?.response?.data) {
      if (error.response.data.detail) errMessage = error.response.data.detail;
      else {
        const values = Object.values(error.response.data);

        let msg = "";

        values.forEach((value) => {
          if (Array.isArray(value)) {
            msg += value.join("\n") + "\n";
          } else {
            msg += value + "\n";
          }
        });

        errMessage = msg;
      }
    }
  } else errMessage = "Something bad happened!";

  return errMessage;
};

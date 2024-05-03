import { AxiosError, AxiosResponse } from "axios";

// Define your data type
interface CustomData {
  // Define the properties you need
  type: string;
  msg: string;
}

// Define your custom error class extending AxiosError
export class CustomAxiosError<T = CustomData> extends AxiosError<T> {
  // Override the response property to make it writable
  response?: AxiosResponse<T>;

  // Constructor to initialize the custom error
  constructor(
    message: string,
    config: AxiosError<T>["config"],
    response?: AxiosResponse<T>
  ) {
    super();

    // Assign the modified response object
    this.response = response;
  }
}

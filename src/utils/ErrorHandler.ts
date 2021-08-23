export class ErrorHandler {
  public static handle = (error: Error): void => {
    console.error("Custom Error Handler: ", error.message);
  };
}

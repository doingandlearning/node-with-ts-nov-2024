// TypeError()
// SyntaxError()
// Error()
// URIError()
// EvalError()
// RangeError()

type ErrorContext = Record<string, string>;

class SPError extends Error {
  constructor(
    message: string,
    public code = "ERR_API_ERROR",
    public context: ErrorContext = {}
  ) {
    super(message);
    this.code = code;
  }
}

try {
  // const newError = new SPError("Something went wrong.");
  // newError.code = "ERR_PERMISSIONS_ERROR";
  // throw newError;
  throw new SPError("Something went wrong", "ERR_PERMISSIONS_ERROR", {
    caller: "id",
    uri: "/",
  });
} catch (error) {
  if (error instanceof SPError) {
    console.log("This is something we are responsible for.");
    console.log(
      `Please contact support and reference the error code ${error.code}.`
    );

    // emailing or adding to the log
    console.log(error.context);
  } else {
    console.log("Something went wrong.");
  }
}

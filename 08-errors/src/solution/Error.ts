// mathOperations.ts

// Define the type for the expected operation result.
type OperationResult = number | Error;

// Custom error class with an error code property.
class LessThanZeroError extends Error {
  errorCode: string;

  constructor(message: string) {
    super(message);
    this.name = "LessThanZeroError";
    this.errorCode = "NEGATIVE_INPUT";
  }
}

// The function that might throw an error if the input is less than zero.
function mightThrowError(input: number): number {
  if (input < 0) {
    throw new LessThanZeroError("Input should not be less than zero.");
  }
  // Assume a successful operation doubles the input for demonstration purposes.
  return input * 2;
}

// Process input with error handling.
export function processInput(value: any): OperationResult {
  try {
    // Ensure the input is a number.
    if (typeof value !== "number") {
      throw new TypeError("The provided input is not a number.");
    }
    // Attempt to process the input and return the result.
    return mightThrowError(value);
  } catch (error) {
    // If the caught error is an instance of LessThanZeroError, return it.
    if (error instanceof LessThanZeroError) {
      console.error(error.message); // For demonstration purposes.
      return error;
    } else {
      // For other types of errors, log and return a generic error.
      console.error("An unexpected error occurred:", error);
      return new Error("An unexpected error occurred.");
    }
  }
}

// Test cases
const testInputs = [5, -3, "10"];

testInputs.forEach((input) => {
  const result = processInput(input);
  if (result instanceof Error) {
    console.log(getFriendlyErrorMessage(result));
  } else {
    console.log(`Success: ${result}`);
  }
});

// Function to map error codes to user-friendly messages.
function getFriendlyErrorMessage(error: Error): string {
  const errorCodeMap: Record<string, string> = {
    INVALID_INPUT: "The provided input is not valid.",
    NEGATIVE_INPUT: "Negative numbers are not allowed.",
    // Add more mappings as needed.
  };

  // Cast the error to any to access the errorCode property
  const errorCode = (error as any).errorCode;
  return errorCodeMap[errorCode] || error.message;
}

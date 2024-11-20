### Creating a Custom Error Class and Leveraging Error Codes

#### Objective:

Enhance the `processInput` function by introducing a custom error class. This class will provide more specific error information when an invalid input is encountered. Additionally, implement error codes to distinguish between different types of errors.

#### Starting Code:

```typescript
// mathOperations.ts

// Custom error class
// Create a custom error
class LessThanZeroError extends Error {}

function mightThrowError(input: number): number {
  // if the input < 0 throw a custom error
}

export function processInput(value: any) {
  // Task: Enhance this function based on the instructions below
  // try/catch
  // check instanceof
}
```

#### Instructions:

1. **Implement Error Codes**: Inside your custom error class, include an `errorCode` property to provide a specific code for each type of error.

2. **Enhance `processInput` Function**:

   - Use the custom `InvalidInputError` class when the input type is incorrect.
   - Add specific error handling for different operational errors that `mightThrowError` might produce, using distinct error codes for each.

3. **Test Your Error Handling**:
   - Write test cases that attempt to process various invalid inputs and check if the appropriate error codes are set on the returned error objects.

#### Your Task:

Modify the `processInput` function to utilize the `InvalidInputError` class and error codes for better error differentiation.

```typescript
// mathOperations.ts

// ... Custom error class above ...

export function processInput(value: any): OperationResult {
  // Add type checking and use the InvalidInputError if value is not a number
  // Use try/catch to handle errors from mightThrowError and assign appropriate error codes
}
```

After implementing the custom error class and error codes, create test cases for the following scenarios:

- Passing a string should return an `InvalidInputError` with the code "INVALID_INPUT".
- Passing a negative number should return an `Error` with a code indicating a negative input error.
- Passing a valid positive number should process correctly and return the doubled value.

#### Bonus Challenge:

Create a map of error codes to user-friendly messages. Write a function that takes an error object and returns a user-friendly error message based on the error code. This function would be especially useful for logging purposes or displaying messages to end-users.

```typescript
const errorCodeMap = {
  INVALID_INPUT: "The provided input is not valid.",
  NEGATIVE_INPUT: "Negative numbers are not allowed.",
  // Add more as needed
};

function getFriendlyErrorMessage(error: Error): string {
  // If the error has a known code, return the corresponding friendly message
  // Otherwise, return a default error message
}
```

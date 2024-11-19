### **1. Request Timing Middleware**

**Problem**: Create middleware that calculates and logs the time taken to process a request.

**Requirements**:

- Log the HTTP method, URL, and time taken for each request.
- Only log the time for requests to routes starting with `/api`.
- Ensure it doesn't interfere with the response sent to the client.

**Challenge**: Enhance the middleware to:

- Include the status code of the response in the log.
- Add a threshold (e.g., 500ms) to log warnings for slow requests.

---

### **2. Input Validation Middleware**

**Problem**: Create middleware that validates incoming data for a `POST /register` endpoint.

**Requirements**:

- Check that the request body contains `name`, `email`, and `password`.
- Ensure the `email` is in a valid email format.
- Ensure the `password` is at least 8 characters long.
- Respond with a `400 Bad Request` status and a meaningful error message if validation fails.

**Challenge**: Generalize the middleware to:

- Work for multiple routes with different validation rules.
- Use a library like `joi` or `express-validator` to streamline validation.

---

### **3. Rate-Limiting Middleware**

**Problem**: Build middleware to limit the number of requests a user can make to an API within a time frame.

**Requirements**:

- Allow a maximum of 10 requests per minute per IP address.
- Respond with a `429 Too Many Requests` status if the limit is exceeded.
- Reset the request count for each IP after 1 minute.

**Challenge**:

- Use an in-memory store (e.g., `Map`) for simplicity, but abstract it so you can switch to Redis for distributed rate limiting.
- Include the remaining request count in the `X-RateLimit-Remaining` header of each response.

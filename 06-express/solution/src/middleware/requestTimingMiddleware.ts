import { Request, Response, NextFunction } from "express";

function requestTimingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Only log requests for routes starting with /api
  if (!req.originalUrl.startsWith("/api")) {
    return next();
  }

  const start = process.hrtime(); // Start timing

  // Hook into the response's 'finish' event to calculate response time
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;

    // Log the method, URL, status code, and response time
    console.log(
      `[${req.method}] ${req.originalUrl} - Status: ${
        res.statusCode
      } - Time: ${milliseconds.toFixed(2)} ms`
    );
  });

  next(); // Proceed to the next middleware/route
}

export default requestTimingMiddleware;

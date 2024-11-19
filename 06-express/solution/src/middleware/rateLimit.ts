import { Request, Response, NextFunction } from "express";

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const LIMIT = 10; // Max requests per time window
const WINDOW_MS = 60 * 1000; // Time window in milliseconds (1 minute)

function rateLimitingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientIP = req.ip; // Get client IP (works with proxy setups if trust proxy is set)

  const currentTime = Date.now();

  const requestLog = rateLimitMap.get(clientIP!) || {
    count: 0,
    lastRequest: currentTime,
  };

  // Reset the counter if the time window has passed
  if (currentTime - requestLog.lastRequest > WINDOW_MS) {
    requestLog.count = 0;
    requestLog.lastRequest = currentTime;
  }

  requestLog.count++;

  // Update the map with the latest request log
  rateLimitMap.set(clientIP!, requestLog);

  // Check if the user has exceeded the limit
  if (requestLog.count > LIMIT) {
    res.set("Retry-After", Math.ceil(WINDOW_MS / 1000).toString());
    res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
    return;
  }

  // Add remaining requests information to the response headers
  res.set("X-RateLimit-Limit", LIMIT.toString());
  res.set("X-RateLimit-Remaining", (LIMIT - requestLog.count).toString());
  res.set("X-RateLimit-Reset", (requestLog.lastRequest + WINDOW_MS).toString());

  next();
}

export default rateLimitingMiddleware;

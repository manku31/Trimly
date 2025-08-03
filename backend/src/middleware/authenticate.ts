import { Request, Response, NextFunction } from "express";
import { TokenServices } from "../utils/tokenService";
import { JWTPayload } from "../types/type";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokem = TokenServices.extractTokenFromHeader(
      req.headers.authorization
    );

    if (!tokem) {
      return res.status(401).json({
        message: "Access token is required",
        error: "UNAUTHORIZED",
      });
    }

    const decoded = TokenServices.verifyAccessToken(tokem);

    if (decoded.type !== "access") {
      return res.status(401).json({
        message: "Invalid token type",
        error: "INVALID_TOKEN",
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token has expired",
          error: "TOKEN_EXPIRED",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid access token",
          error: "INVALID_TOKEN",
        });
      }
    }

    return res.status(500).json({
      message: "Internal server error during authentication",
      error: "AUTH_ERROR",
    });
  }
};

// Optional middleware for routes that can work with or without authentication
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = TokenServices.extractTokenFromHeader(
      req.headers.authorization
    );

    if (token) {
      const decoded = TokenServices.verifyAccessToken(token);
      if (decoded.type === "access") {
        req.user = decoded;
      }
    }

    next();
  } catch (error) {
    // For optional auth, we continue even if token is invalid
    next();
  }
};

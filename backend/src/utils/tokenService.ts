import {
  accesTokenExpire,
  jwtAccesSecret,
  jwtRefreshSecret,
  refreshTokenSecret,
} from "../config/constant";
import { JWTPayload } from "../types/type";
import jwt, { SignOptions } from "jsonwebtoken";

export class TokenServices {
  // Generate access token
  static generateAccessToken(payload: Omit<JWTPayload, "type">): string {
    const token = jwt.sign(
      { ...payload, type: "access" }, // payload
      jwtAccesSecret as string, // Scret key
      {
        expiresIn: accesTokenExpire, // Expiry time
      } as SignOptions
    );

    return token;
  }

  // Generate refresh token
  static generateRefreshToken(payload: Omit<JWTPayload, "type">): string {
    const token = jwt.sign(
      { ...payload, type: "refresh" },
      jwtRefreshSecret as string,
      { expiresIn: refreshTokenSecret } as SignOptions
    );

    return token;
  }

  // Generate both tokens
  static generateTokens(payload: Omit<JWTPayload, "type">): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  // Verify access token
  static verifyAccessToken(token: string): JWTPayload {
    const data = jwt.verify(token, jwtAccesSecret as string) as JWTPayload;

    return data;
  }

  // Verify refresh token
  static verifyRefreshToken(token: string): JWTPayload {
    const data = jwt.verify(token, jwtRefreshSecret as string) as JWTPayload;

    return data;
  }

  // Extract token from Authorization header
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.substring(7);
  }
}

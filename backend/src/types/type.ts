export interface JWTPayload {
  user_id: number;
  email: string;
  type: "access" | "refresh";
}

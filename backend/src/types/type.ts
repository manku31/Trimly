export interface JWTPayload {
  user_id?: number;
  barber_id?: number;
  email: string;
  type: "access" | "refresh";
}

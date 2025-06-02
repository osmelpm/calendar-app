import { AuthStatus } from "./enums";

export type User = { uid: string; name: string; email: string };

export type AuthState = {
  status: AuthStatus;
  user: User | null;
  errorMessage: string | null;
};

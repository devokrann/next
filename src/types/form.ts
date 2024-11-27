export interface PasswordReset {
  password: { initial: string; confirm: string };
}

export interface SignUp extends PasswordReset {
  name: string;
  email: string;
}

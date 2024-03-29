export interface LoginCredential {
  username: string;
  password: string;
}

export interface Token {
  refresh: string;
  access: string;
}

export interface RegisterCredential {
  first_name: string;
  email: string;
  password: string;
  retype_password: string;
  verification: {
    passcode: string;
    challenge: string;
    token: string;
  };
}

export interface PasswordRecoveryCredential {
  verifycode_email: string;
  verifycode_msisdn: string;
  verifycode_passcode: string;
  verifycode_token: string;
  new_password: string;
  retype_password: string;
  password_token: string;
  password_uidb64: string;
}

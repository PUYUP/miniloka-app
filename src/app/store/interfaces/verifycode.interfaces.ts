export interface InvokeVerifycode {
  email?: string;
  msisdn?: string;
  challenge: string;
}

export interface ValidateVerifycode {
  email?: string;
  msisdn?: string;
  challenge: string;
  passcode: string;
  token: string;
}

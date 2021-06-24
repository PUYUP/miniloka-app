export interface InvokeSecureCode {
  email?: string;
  msisdn?: string;
  challenge: string;
}

export interface ValidateSecureCode {
  email?: string;
  msisdn?: string;
  challenge: string;
  passcode: string;
  token: string;
}

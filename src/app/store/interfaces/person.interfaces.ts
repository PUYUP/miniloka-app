export interface Profile {
  first_name: string;
  address?: string;
}

export interface Security {
  username?: string;
  email?: string;
  msisdn?: string;
  verification?: {
    passcode: string;
    challenge: string;
    token: string;
  };
}

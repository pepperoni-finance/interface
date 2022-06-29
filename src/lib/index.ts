export interface Token {
  readonly address: string;
  readonly chainId: number;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly logoURI: string;
  readonly isChainToken?: boolean;
}

export interface Network {
  chainId: number;
  chainToken: Token;
  name: string;
  url: string;
  logoURI: string;
}

export interface Asset extends Token {
  weight: number;
}

export interface Quote {
  updatedAt: number | undefined;
  amount: string | undefined;
  loading: boolean;
  error: boolean;
}

export interface Amount {
  amount: string | undefined;
  displayAmount: string | undefined;
  loading: boolean;
  error: boolean;
  timestamp: number | undefined;
}

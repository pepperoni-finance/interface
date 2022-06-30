import { z } from "zod";

export const TokenListSchema = z.object({
  name: z.string(),
  tokens: z.array(
    z.object({
      chainId: z.number(),
      address: z.string(),
      name: z.string(),
      symbol: z.string(),
      decimals: z.number(),
      logoURI: z.string(),
    })
  ),
});

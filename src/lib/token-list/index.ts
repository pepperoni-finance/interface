import { TokenListSchema } from "./token-list-schema";

export async function fetchTokenList(url: string) {
  const response = await fetch(url);

  return await TokenListSchema.parseAsync(await response.json());
}

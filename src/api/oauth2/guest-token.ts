import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";

const url = migrosApiPaths["authentication"].public.v1 + "/guest";

export interface IAuthenticationOptions extends Record<string, any> {
  ignoreAuthModule: boolean;
}

const defaultAuthenticationOptions: IAuthenticationOptions = {
  ignoreAuthModule: true,
};

async function getGuestTokenRequest(
  url: string,
  options: IAuthenticationOptions,
): Promise<Record<string, any>> {
  const necessary_headers = {
    accept: "application/json, text/plain, *!/!*",
  };

  const response = await getRequest(url, options, necessary_headers);

  return {
    token: response.headers["leshopch"],
    body: response.body,
  };
}

export async function getGuestToken(): Promise<any> {
  return getGuestTokenRequest(url, defaultAuthenticationOptions);
}

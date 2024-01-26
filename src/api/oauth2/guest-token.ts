import { getRequest } from "../../utils/requests";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

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
  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
  };

  const response = await getRequest(url, options, necessaryHeaders);

  retrieveSetCookieFromHeaders(response.headers);

  return {
    token: response.headers.get("leshopch"),
    body: await response.json(),
  };
}

export async function getGuestToken(): Promise<any> {
  return getGuestTokenRequest(url, defaultAuthenticationOptions);
}

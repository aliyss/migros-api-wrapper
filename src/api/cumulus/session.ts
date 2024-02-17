/* eslint-disable @typescript-eslint/naming-convention */
import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { ICumulusCookies } from "../interfaces/cookies";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = migrosApiPaths["cumulus"] + "/de.html";

async function getCumulusSessionRequest(
  url: string,
  cookies: ICumulusCookies,
): Promise<Record<string, any>> {
  const headers = {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await getRequest(url, {}, headers, cookies);

  return {
    ["set-cookie"]: retrieveSetCookieFromHeaders(response.headers),
  };
}

export async function getCumulusSession(
  cookies: ICumulusCookies,
): Promise<any> {
  return getCumulusSessionRequest(url, cookies);
}

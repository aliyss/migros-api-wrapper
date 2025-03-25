import { appendParametersToUrl } from "./appendParametersToUrl";
import { addCookieToHeaders } from "./addCookieToHeaders";
import { ICookies } from "../api/interfaces/cookies";

import tls from "tls";
import axios, { AxiosResponse } from "axios";
tls.DEFAULT_MIN_VERSION = "TLSv1.3";

export async function getRequest(
  url: string,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<Response> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  return response;
}

export async function getRequestBypass(
  url: string,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<AxiosResponse> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  return await axios(url, {
    method: "GET",
    headers: headers,
  });
}

export async function postRequest(
  url: string,
  body: Record<string, any> | null,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<Response> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body) || undefined,
    headers: headers,
  });
  return response;
}

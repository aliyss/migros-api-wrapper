import { appendParametersToUrl } from "./appendParametersToUrl";
import { addCookieToHeaders } from "./addCookieToHeaders";
import { ICookies } from "../api/interfaces/cookies";

import axios, { AxiosResponse } from "axios";
import https from "https";

const axiosClient = axios.create({
  httpsAgent: new https.Agent({
    minVersion: "TLSv1.3",
  }),
});

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
): Promise<{
  headers: AxiosResponse["headers"];
  data: AxiosResponse["data"];
}> {
  if (!headers["User-Agent"] && process.env.MIGROS_API_WRAPPER_USERAGENT) {
    headers["User-Agent"] = process.env.MIGROS_API_WRAPPER_USERAGENT;
  }

  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = await axiosClient(url, {
    method: "GET",
    headers: headers,
  });

  return response;
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

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body) || undefined,
    headers: headers,
  });
}

export async function postRequestBypass(
  url: string,
  body: Record<string, any> | null,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<{
  headers: AxiosResponse["headers"];
  data: AxiosResponse["data"];
}> {
  if (!headers["User-Agent"] && process.env.MIGROS_API_WRAPPER_USERAGENT) {
    headers["User-Agent"] = process.env.MIGROS_API_WRAPPER_USERAGENT;
  }

  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = await axiosClient(url, {
    method: "POST",
    data: body,
    headers: headers,
  });

  return response;
}

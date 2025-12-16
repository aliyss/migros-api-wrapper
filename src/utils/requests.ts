import { appendParametersToUrl } from "./appendParametersToUrl";
import { addCookieToHeaders } from "./addCookieToHeaders";
import { ICookies } from "../api/interfaces/cookies";

import tls from "tls";
import axios, { AxiosResponse } from "axios";
import { exec } from "child_process";

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

  if (process.env.MIGROS_API_WRAPPER_USECURL) {
    console.warn("Using curl to bypass cloudflare protection.");
    return getRequestBypassStrong(url, options, headers, cookies);
  }

  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const previousMinVersion = tls.DEFAULT_MIN_VERSION;

  tls.DEFAULT_MIN_VERSION = "TLSv1.3";

  const response = await axios(url, {
    method: "GET",
    headers: headers,
  });

  tls.DEFAULT_MIN_VERSION = previousMinVersion;

  return response;
}

const execPromise = (cmd: string) => {
  return new Promise(function (resolve, reject) {
    exec(cmd, function (err: any, stdout: any) {
      if (err) return reject(err);

      resolve(stdout);
    });
  });
};

export async function getRequestBypassStrong(
  url: string,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<{
  headers: AxiosResponse["headers"];
  data: AxiosResponse["data"];
}> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = (await execPromise(
    `curl -v --tlsv1.3 ${url} ${Object.keys(headers)
      .map((key) => `-H "${key}: ${headers[key]}"`)
      .join(" ")} -D -`,
  )) as string;

  const [headersString, data] = response.split("\r\n\r\n");
  const headersArray = headersString.split("\r\n").slice(1);
  const headersObject: Record<string, string> = {};
  headersArray.forEach((header) => {
    const [key, value] = header.split(": ");
    headersObject[key] = value;
  });

  return {
    headers: headersObject,
    data: JSON.parse(data),
  };
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

  if (process.env.MIGROS_API_WRAPPER_USECURL) {
    console.warn("Using curl to bypass cloudflare protection.");
    return postRequestBypassStrong(url, body, options, headers, cookies);
  }

  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const previousMinVersion = tls.DEFAULT_MIN_VERSION;

  tls.DEFAULT_MIN_VERSION = "TLSv1.3";

  const response = await axios(url, {
    method: "POST",
    data: body,
    headers: headers,
  });

  tls.DEFAULT_MIN_VERSION = previousMinVersion;

  return response;
}

export async function postRequestBypassStrong(
  url: string,
  body: Record<string, any> | null,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: ICookies = {},
): Promise<{
  headers: AxiosResponse["headers"];
  data: AxiosResponse["data"];
}> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  const response = (await execPromise(
    `curl -v --tlsv1.3 -X POST ${url} ${Object.keys(headers)
      .map((key) => `-H "${key}: ${headers[key]}"`)
      .join(" ")} --raw-data '${JSON.stringify(body)}' -D -`,
  )) as string;

  const [headersString, data] = response.split("\r\n\r\n");
  const headersArray = headersString.split("\r\n").slice(1);
  const headersObject: Record<string, string> = {};
  headersArray.forEach((header) => {
    const [key, value] = header.split(": ");
    headersObject[key] = value;
  });

  return {
    headers: headersObject,
    data: JSON.parse(data),
  };
}

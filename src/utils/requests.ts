import { appendParametersToUrl } from "./appendParametersToUrl";
import { addCookieToHeaders } from "./addCookieToHeaders";

export async function getRequest(
  url: string,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: Record<string, string> = {},
): Promise<Response> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postRequest(
  url: string,
  body: Record<string, any> | null,
  options: Record<string, string>,
  headers: Record<string, string> = {},
  cookies: Record<string, string> = {},
): Promise<Response> {
  url = appendParametersToUrl(url, options);
  headers = addCookieToHeaders(headers, cookies);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body) || undefined,
      headers: headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

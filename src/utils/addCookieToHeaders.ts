import { ICookies } from "../api/interfaces/cookies";

export function addCookieToHeaders(
  headers: Record<string, string>,
  cookies: ICookies
): Record<string, string> {
  if (Object.keys(cookies).length === 0) {
    return headers;
  }
  headers["cookie"] = Object.keys(cookies)
    .filter((key) => cookies[key] !== undefined)
    .map((key) => [key, cookies[key]].join("="))
    .join("; ");
  return headers;
}

import { Headers } from "../types/Headers";

export function retrieveSetCookieFromHeaders(
  headersCookies: Headers,
): Record<string, string> {
  const changeCookies: Record<string, string> = {};
  [headersCookies.get("set-cookie") || ""].forEach((value: string) => {
    const keyValueCookie = value.split(";")[0];
    if (!keyValueCookie) {
      return;
    }
    if (!keyValueCookie.split("=")[0]) {
      return;
    }
    if (!keyValueCookie.split("=")[1]) {
      return;
    }
    changeCookies[keyValueCookie.split("=")[0]] = keyValueCookie.split("=")[1];
  });
  return changeCookies;
}

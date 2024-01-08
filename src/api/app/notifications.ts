/* eslint-disable @typescript-eslint/naming-convention */
import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IAppDeviceSettings } from "../interfaces/device";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = migrosApiPaths["login"] + "/mobilepayment/devices";

async function getAllNotificationsRequest(
  token: string,
  appDeviceSettings: IAppDeviceSettings,
): Promise<Record<string, any>> {
  const headers = {
    Host: "mobile-app.migros.ch",
    Connection: "Keep-Alive",
    "Accept-Encoding": "gzip",
    "User-Agent": "okhttp/4.10.0",
    Authorization: "Bearer " + token,
    // 'If-None-Match': '',
    ...appDeviceSettings,
    ["x-app-build"]: appDeviceSettings["x-app-build"].toString(),
    ["x-app-ecom-toggle"]: appDeviceSettings["x-app-ecom-toggle"].toString(),
    ["x-siren-version"]: appDeviceSettings["x-siren-version"].toString(),
    ["x-app-famigros-loyalty"]:
      appDeviceSettings["x-app-famigros-loyalty"].toString(),
    ["x-app-cumulus-number"]:
      appDeviceSettings["x-app-cumulus-number"].toString(),
    ["x-route-version"]: appDeviceSettings["x-route-version"].toString(),
    ["x-app-migros-cooperative"]:
      appDeviceSettings["x-app-migros-cooperative"].toString(),
    ["x-app-login-id"]: appDeviceSettings["x-app-login-id"].toString(),
    ["x-feature-flags"]: appDeviceSettings["x-feature-flags"].toString(),
    ["x-app-migusto-member"]:
      appDeviceSettings["x-app-migusto-member"].toString(),
    ["Accept-Language"]: appDeviceSettings["Accept-Language"].toString(),
    ["x-app-migros-zipcode"]:
      appDeviceSettings["x-app-migros-zipcode"].toString(),
    ["x-app-cumulus-enabled"]:
      appDeviceSettings["x-app-cumulus-enabled"].toString(),
    ["x-device-os-version"]:
      appDeviceSettings["x-device-os-version"].toString(),
    ["x-device-width"]: appDeviceSettings["x-device-width"].toString(),
    ["x-device-timestamp"]: appDeviceSettings["x-device-timestamp"].toString(),
    ["x-app-request-sequence"]:
      appDeviceSettings["x-app-request-sequence"].toString(),
  };

  const response = await getRequest(url, {}, headers);

  return {
    body: response.body,
    ["set-cookie"]: retrieveSetCookieFromHeaders(
      response.headers["set-cookie"],
    ),
  };
}

export async function getAllNotifications(
  token: string,
  appDeviceSettings: IAppDeviceSettings,
): Promise<any> {
  return getAllNotificationsRequest(token, appDeviceSettings);
}

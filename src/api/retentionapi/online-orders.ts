import { getRequest } from "../../utils/requests";
import { migrosApiPaths } from "../apiPaths";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";
import { ICookies } from "../interfaces/cookies";

const urlBase = migrosApiPaths.retentionapi + "/public/web/v1/customers/orders/invoices";

export interface IOnlineOrderInvoiceOptions {
  orderId: string;
}

export async function getOrderInvoice(
  options: IOnlineOrderInvoiceOptions,
  cookies?: ICookies,
): Promise<any> {
  const url = `${urlBase}/${options.orderId}`;
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
  };

  const response = await getRequest(url, {}, headers, cookies);

  return {
    body: await response.json(),
    ["set-cookie"]: retrieveSetCookieFromHeaders(response.headers),
  };
}

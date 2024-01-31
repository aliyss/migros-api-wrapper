import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["marketablestock"].public.v1 + "/warehouses";

export interface IProductSupplyOptions {
  pids: string | string[];
  warehouses: number;
}

const defaultProductSupplyOptions: IProductSupplyOptions = {
  pids: "",
  warehouses: 0,
};

async function getProductCardsRequest(
  url: string,
  options: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  if (Array.isArray(options.pids)) {
    options.pids = options.pids.join(",");
  }

  url += `/${options.warehouses}/products/${options.pids}`;

  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
    ...headers,
  };

  const response = await getRequest(url, {}, necessaryHeaders);

  return await response.json();
}

export async function getProductSupply(
  productSupplyOptions: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productSupplyOptions = {
    ...defaultProductSupplyOptions,
    ...productSupplyOptions,
  };
  return getProductCardsRequest(url, productSupplyOptions, headers);
}

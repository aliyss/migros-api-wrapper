import { getRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["store-availability"].public.v2 + "/products";

export interface IProductSupplyOptions {
  pids: string;
  costCenterIds: string | string[];
}

const defaultProductSupplyOptions: IProductSupplyOptions = {
  pids: "",
  costCenterIds: "0",
};

async function getProductSupplyRequest(
  url: string,
  options: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  if (Array.isArray(options.costCenterIds)) {
    options.costCenterIds = options.costCenterIds.join(",");
  }

  url += `/${options.pids}?costCenterIds=${options.costCenterIds}`;

  const necessaryHeaders = {
    accept: "application/json, text/plain, */*",
    ...headers,
  };

  const response = await getRequestBypass(url, {}, necessaryHeaders);

  return response.data;
}

export async function getProductSupply(
  productSupplyOptions: IProductSupplyOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productSupplyOptions = {
    ...defaultProductSupplyOptions,
    ...productSupplyOptions,
  };
  return getProductSupplyRequest(url, productSupplyOptions, headers);
}

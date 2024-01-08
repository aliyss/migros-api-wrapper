import { StoreType } from "../enums/StoreType";
import { Region } from "../enums/Region";

import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["product-display"].public.v2 + "/product-detail";

export interface IProductDetailOptions extends Record<string, any> {
  uids?: string | string[];
  storeType?: StoreType;
  region?: Region;
  newCategoryTree?: boolean;
  warehouseId?: number;
  ongoingOfferDate?: string;
  migrosIds?: string;
}

const defaultProductDetailOptions: IProductDetailOptions = {
  warehouseId: 1,
  storeType: StoreType.OFFLINE,
  region: Region.NATIONAL,
};

async function getProductDetailRequest(
  url: string,
  options: IProductDetailOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  if (Array.isArray(options.uids)) {
    options.uids = options.uids.join(",");
  }

  const necessary_headers = {
    accept: "application/json, text/plain, *!/!*",
    ...headers,
  };

  const response = await getRequest(url, options, necessary_headers);

  return response.body;
}

export async function getProductDetail(
  productDetailOptions: IProductDetailOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productDetailOptions = {
    ...defaultProductDetailOptions,
    ...productDetailOptions,
  };
  return getProductDetailRequest(url, productDetailOptions, headers);
}

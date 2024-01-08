import { StoreType } from "../enums/StoreType";
import { Region } from "../enums/Region";

import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["product-display"].public.v2 + "/product-cards";

export interface IProductCardsOptions extends Record<string, any> {
  uids: string | string[];
  storeType?: StoreType;
  region?: Region;
  newCategoryTree?: boolean;
  ongoingOfferDate?: string;
}

const defaultProductCardsOptions: IProductCardsOptions = {
  uids: "",
  storeType: StoreType.OFFLINE,
  region: Region.NATIONAL,
};

async function getProductCardsRequest(
  url: string,
  options: IProductCardsOptions,
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

export async function getProductCards(
  productCardOptions: IProductCardsOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productCardOptions = { ...defaultProductCardsOptions, ...productCardOptions };
  return getProductCardsRequest(url, productCardOptions, headers);
}

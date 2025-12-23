import { StoreType } from "../enums/StoreType";
import { Region } from "../enums/Region";

import { postRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";
import deepmerge from "deepmerge";
import { Language } from "../enums/Language";
import { SortFields } from "../enums/SortFields";
import { SortOrder } from "../enums/SortOrder";

const url =
  migrosApiPaths["product-display"].public.web.v2 +
  "/products/promotion/search";

export interface IProductPromotionSearchOptions extends Record<string, any> {
  filters?: Record<string, any>;
  from?: number;
  language?: Language;
  period?: "CURRENT";
  region?: Region;
  sortFields?: SortFields[];
  sortOrder?: SortOrder;
  storeType?: StoreType;
  until?: number;
  warehouse?: string;
}

const defaultProductCardsOptions: IProductPromotionSearchOptions = {
  storeType: StoreType.OFFLINE,
  period: "CURRENT",
  language: Language.EN,
  filters: {},
  sortFields: [SortFields.CATEGORYLEVEL],
  sortOrder: SortOrder.ASC,
  from: 0,
  until: 100,
  region: Region.NATIONAL,
  warehouse: "1",
};

async function getProductPromotionSearchRequest(
  url: string,
  body: IProductPromotionSearchOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "Content-Type": "application/json",
    ...headers,
  };

  const response = await postRequestBypass(url, body, {}, necessaryHeaders);

  return await response.data;
}

export async function getProductPromotionSearch(
  productPromotionSearchOptions: IProductPromotionSearchOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productPromotionSearchOptions = deepmerge(
    defaultProductCardsOptions,
    productPromotionSearchOptions,
  );
  return getProductPromotionSearchRequest(
    url,
    productPromotionSearchOptions,
    headers,
  );
}

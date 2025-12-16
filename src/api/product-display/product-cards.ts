import { StoreType } from "../enums/StoreType";
import { Region } from "../enums/Region";

import { postRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";
import deepmerge from "deepmerge";

const url = migrosApiPaths["product-display"].public.v4 + "/product-cards";

export interface IProductCardsOptions extends Record<string, any> {
  productFilter: {
    uids: number[];
  };
  offerFilter?: {
    storeType?: StoreType;
    region?: Region;
    newCategoryTree?: boolean;
    ongoingOfferDate?: string;
  };
}

const defaultProductCardsOptions: IProductCardsOptions = {
  productFilter: {
    uids: [],
  },
  offerFilter: {
    storeType: StoreType.OFFLINE,
    region: Region.NATIONAL,
  },
};

async function getProductCardsRequest(
  url: string,
  body: IProductCardsOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  if (body.offerFilter && !body.offerFilter?.ongoingOfferDate) {
    body.offerFilter.ongoingOfferDate =
      new Date().toISOString().split("T")[0] + "T00:00:00";
  }

  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "Content-Type": "application/json",
    ...headers,
  };

  const response = await postRequestBypass(url, body, {}, necessaryHeaders);

  return await response.data;
}

export async function getProductCards(
  productCardOptions: IProductCardsOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  productCardOptions = deepmerge(
    defaultProductCardsOptions,
    productCardOptions,
  );
  return getProductCardsRequest(url, productCardOptions, headers);
}

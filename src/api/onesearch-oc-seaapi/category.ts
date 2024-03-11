import { Region } from "../enums/Region";
import { Language } from "../enums/Language";
import { Algorithm } from "../enums/Algorithm";
import { SortFields } from "../enums/SortFields";
import { SortOrder } from "../enums/SortOrder";

import { postRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["onesearch-oc-seapi"].public.v3 + "/search/category";

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ICategoryListOptions = Record<string, any>;

const defaultCategoryListOptions: ICategoryListOptions = {};

export interface ICategoryListBody extends Record<string, any> {
  algorithm?: Algorithm;
  categoryId: number;
  filters?: Record<any, any>;
  from: number;
  language?: Language;
  productIds?: string[];
  regionId?: Region;
  requestSponsoredProducts: boolean;
  sortFields?: SortFields[];
  sortOrder?: SortOrder;
}

const defaultCategoryListBody: ICategoryListBody = {
  algorithm: Algorithm.DEFAULT,
  regionId: Region.NATIONAL,
  language: Language.EN,
  productIds: [],
  sortFields: [],
  sortOrder: SortOrder.ASC,
  requestSponsoredProducts: false,
  from: 0,
  categoryId: 0,
};

async function postCategoryListRequest(
  url: string,
  body: ICategoryListBody,
  options: ICategoryListOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "content-type": "application/json",
    ...headers,
  };

  const response = await postRequest(url, body, options, necessaryHeaders);

  return await response.json();
}

export async function categoryList(
  categoryListBody: ICategoryListBody,
  headers: IMigrosNecessaryHeaders,
  categoryListOptions?: ICategoryListOptions,
): Promise<any> {
  categoryListOptions = {
    ...defaultCategoryListOptions,
    ...categoryListOptions,
  };
  categoryListBody = { ...defaultCategoryListBody, ...categoryListBody };

  return postCategoryListRequest(
    url,
    categoryListBody,
    categoryListOptions,
    headers,
  );
}

import { Region } from "../enums/Region";
import { Language, LanguageUpper } from "../enums/Language";
import { Algorithm } from "../enums/Algorithm";
import { SortFields } from "../enums/SortFields";
import { SortOrder } from "../enums/SortOrder";

import { getRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["onesearch-oc-seapi"].public.v2 + "/storemap";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICategoryListOptions extends Record<string, any> {
  language?: LanguageUpper;
  regionId?: Region;
  storeMapScope?: "DEFAULT" | string;
  [key: string]: any;
}

const defaultCategoryListOptions: ICategoryListOptions = {
  language: LanguageUpper.EN,
  regionId: Region.NATIONAL,
  storeMapScope: "DEFAULT",
};

export interface ICategoryListBody extends Record<string, any> {
  algorithm?: Algorithm;
  categoryId: number;
  filters?: Record<any, any>;
  from: number;
  language?: Language;
  productIds?: string[];
  regionId?: Region;
  requestSponsoredProducts?: boolean;
  sortFields?: SortFields[];
  sortOrder?: SortOrder;
}

async function getCategoryListRequest(
  url: string,
  options: ICategoryListOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  const necessaryHeaders = {
    accept: "application/json, text/plain, *!/!*",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "content-type": "application/json",
    ...headers,
  };

  const response = await getRequestBypass(url, options, necessaryHeaders);

  return response.data;
}

export async function categoryList(
  headers: IMigrosNecessaryHeaders,
  categoryListOptions?: ICategoryListOptions,
): Promise<any> {
  categoryListOptions = {
    ...defaultCategoryListOptions,
    ...categoryListOptions,
  };

  return getCategoryListRequest(url, categoryListOptions, headers);
}

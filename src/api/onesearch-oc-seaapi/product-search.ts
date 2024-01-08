import { Region } from "../enums/Region";
import { Language } from "../enums/Language";
import { Algorithm } from "../enums/Algorithm";
import { SortFields } from "../enums/SortFields";
import { SortOrder } from "../enums/SortOrder";

import { postRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["onesearch-oc-seapi"].public.v5 + "/search";

// eslint-disable-next-line @typescript-eslint/naming-convention
export type IProductSearchOptions = Record<string, any>;

const defaultProductSearchOptions: IProductSearchOptions = {};

export interface IProductSearchBody extends Record<string, any> {
  regionId?: Region;
  language?: Language;
  productIds?: string[];
  query: string;
  sortFields?: SortFields[];
  sortOrder?: SortOrder;
  algorithm?: Algorithm;
  filters?: Record<any, any>;
}

const defaultProductSearchBody: IProductSearchBody = {
  regionId: Region.NATIONAL,
  language: Language.EN,
  productIds: [],
  query: "",
  sortFields: [],
  sortOrder: SortOrder.ASC,
  algorithm: Algorithm.DEFAULT,
};

async function postProductSearchRequest(
  url: string,
  body: IProductSearchBody,
  options: IProductSearchOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  const necessary_headers = {
    accept: "application/json, text/plain, *!/!*",
    "content-type": "application/json",
    ...headers,
  };

  const response = await postRequest(url, body, options, necessary_headers);

  return response.body;
}

export async function postProductSearch(
  productSearchBody: IProductSearchBody,
  headers: IMigrosNecessaryHeaders,
  productSearchOptions?: IProductSearchOptions,
): Promise<any> {
  productSearchOptions = {
    ...defaultProductSearchOptions,
    ...productSearchOptions,
  };
  productSearchBody = { ...defaultProductSearchBody, ...productSearchBody };

  return postProductSearchRequest(
    url,
    productSearchBody,
    productSearchOptions,
    headers,
  );
}

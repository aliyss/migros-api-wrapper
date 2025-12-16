import { getRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths["shopping-list"].public.v1 + "/categories";

export type ICategoryListOptions = Record<string, any>;

const defaultCategoryListOptions: ICategoryListOptions = {};

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

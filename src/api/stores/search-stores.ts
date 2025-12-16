import { getRequestBypass } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IMigrosNecessaryHeaders } from "../interfaces/headers";

const url = migrosApiPaths.store.public.v1 + "/search";

export interface ISearchStoresOptions {
  query: string;
}

const defaultSearchStoresOptions: ISearchStoresOptions = {
  query: "",
};

async function getSearchStoresRequest(
  url: string,
  options: ISearchStoresOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<Record<string, any>> {
  url += `?query=${options.query}`;

  const necessaryHeaders = {
    accept: "application/json, text/plain, */*",
    ...headers,
  };

  const response = await getRequestBypass(url, {}, necessaryHeaders);

  return response.data;
}

export async function searchStores(
  searchStoresOptions: ISearchStoresOptions,
  headers: IMigrosNecessaryHeaders,
): Promise<any> {
  searchStoresOptions = {
    ...defaultSearchStoresOptions,
    ...searchStoresOptions,
  };
  return getSearchStoresRequest(url, searchStoresOptions, headers);
}

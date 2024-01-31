import { postRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { Language } from "../enums/Language";
import { RecipeSearchUuid } from "../enums/migusto/RecipeUuids";
import { MigustoSortOrder } from "../enums/SortOrder";
import { IRecipeSearchResponse } from "../interfaces/migusto/recipe-search";

const url = migrosApiPaths.migusto.recipes.v1;

export interface IRecipeSearchOptions {
  ingredients?: any[];
  language?: Language;
  limit?: number;
  offset?: number;
  order?: MigustoSortOrder;
  recipeFilterUuid?: string;
  searchTerm?: string;
  uuids?: (RecipeSearchUuid | string)[];
}

const defaultRecipeSearchOptions: IRecipeSearchOptions = {
  ingredients: [],
  language: Language.EN,
  limit: 24,
  offset: 0,
  order: MigustoSortOrder.RELEVANCE_DESC,
  recipeFilterUuid: "b11fb25b-e7f6-4eac-b3c1-9e473eeaa0f5",
  searchTerm: "",
  uuids: [],
};

async function postRecipeSearchRequest(
  url: string,
  options: IRecipeSearchOptions,
): Promise<IRecipeSearchResponse> {
  const necessaryHeaders = {
    ["Accept"]: "*/*",
    ["content-type"]: "application/json",
  };

  const response = await postRequest(url, options, {}, necessaryHeaders);

  return await response.json();
}

export async function postRecipeSearch(
  recipeSearchOptions: IRecipeSearchOptions,
): Promise<IRecipeSearchResponse> {
  recipeSearchOptions = {
    ...defaultRecipeSearchOptions,
    ...recipeSearchOptions,
  };
  return postRecipeSearchRequest(url, recipeSearchOptions);
}

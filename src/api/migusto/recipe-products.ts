import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { Language } from "../enums/Language";
import { IRecipeProductsResponse } from "../interfaces/migusto/recipe-products";

const url = migrosApiPaths.migusto.recipeProducts.v1 + "/forIngredients";

export interface IRecipeProductOptions extends Record<string, any> {
  id: string;
  language?: Language;
  limit?: number;
  offset?: number;
}

const defaultRecipeProductOptions: IRecipeProductOptions = {
  id: "",
  language: Language.DE,
  limit: 20,
  offset: 0,
};

async function getRecipeSearchRequest(
  url: string,
  options: IRecipeProductOptions,
): Promise<IRecipeProductsResponse> {
  const necessaryHeaders = {
    ["Accept"]: "*/*",
  };

  const { id, language, ...rest } = options;
  url += `/${id}/${language}/FREQUENCY`;

  const response = await getRequest(url, rest, necessaryHeaders);

  return { productIds: await response.json() };
}

export async function getRecipeProducts(
  recipeProductOptions: IRecipeProductOptions,
): Promise<IRecipeProductsResponse> {
  recipeProductOptions = {
    ...defaultRecipeProductOptions,
    ...recipeProductOptions,
  };
  return getRecipeSearchRequest(url, recipeProductOptions);
}

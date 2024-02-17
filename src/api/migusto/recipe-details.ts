import * as cheerio from "cheerio";
import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { Language } from "../enums/Language";
import { IRecipeDetailsResponse } from "../interfaces/migusto/recipe-details";

const url = migrosApiPaths.migusto.recipeDetails;

export interface IRecipeDetailOptions extends Record<string, any> {
  slug: string;
  language?: Language;
}

const defaultRecipeDetailsOptions: IRecipeDetailOptions = {
  slug: "",
  language: Language.DE,
};

async function getRecipeDetailsRequest(
  url: string,
  options: IRecipeDetailOptions,
): Promise<IRecipeDetailsResponse> {
  const necessaryHeaders = {
    ["Accept"]: "*/*",
  };

  url += `/${options.language}/${options.language === Language.IT ? "ricette" : options.language === Language.FR ? "recettes" : "rezepte"}/${options.slug}`;

  const response = await getRequest(url, {}, necessaryHeaders);

  const $ = cheerio.load(await response.text());

  const header = $("[class='r-header']").first();

  let id = "";
  if (header.children() && header.children()[0]) {
    const headerData = header
      .children()[0]
      .attributes.find((h) => h.name === "data-js-options");
    if (headerData?.value) {
      const headerJSON = JSON.parse(headerData.value);
      id = headerJSON["url"].split("?ratingId=")[1];
    }
  }

  const recipeData = $('[type="application/ld+json"]')
    .toArray()
    .map((i) => {
      return JSON.parse($(i).text());
    })
    .find((x: any) => x["@type"] === "Recipe");

  return {
    id: id,
    name: recipeData.name,
    keywords: recipeData.keywords,
    author: recipeData.author,
    aggregateRating: {
      ratingValue: recipeData.aggregateRating.ratingValue,
      reviewCount: recipeData.aggregateRating.reviewCount,
    },
    images: recipeData.image,
    totalTime: recipeData.totalTime,
    recipeCategory: recipeData.recipeCategory,
    recipeCuisine: recipeData.recipeCuisine,
    recipeInstructions: recipeData.recipeInstructions.map(
      (x: { ["@type"]: string; text: string }) => x.text,
    ),
    recipeYield: recipeData.recipeYield,
    recipeIngredients: recipeData.recipeIngredient,
    datePublished: new Date(recipeData.datePublished),
  };
}

export async function getRecipeDetails(
  recipeDetailOptions: IRecipeDetailOptions,
): Promise<IRecipeDetailsResponse> {
  recipeDetailOptions = {
    ...defaultRecipeDetailsOptions,
    ...recipeDetailOptions,
  };
  return getRecipeDetailsRequest(url, recipeDetailOptions);
}

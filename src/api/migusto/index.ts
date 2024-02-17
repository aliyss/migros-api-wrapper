import { postRecipeSearch } from "./recipe-search";
import { getRecipeProducts } from "./recipe-products";
import { getRecipeDetails } from "./recipe-details";

export const migusto = {
  recipeSearch: postRecipeSearch,
  recipeProducts: getRecipeProducts,
  recipeDetails: getRecipeDetails,
};

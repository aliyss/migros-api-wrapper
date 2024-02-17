import { MigrosAPI } from "./api/MigrosAPI";
import { IRecipeDetailOptions } from "./api/migusto/recipe-details";

(async () => {
  const recipeSearchOptions: IRecipeDetailOptions = {
    slug: "lamingtons",
  };
  const response = await MigrosAPI.migusto.recipeDetails(recipeSearchOptions);
  console.log(response);
})();

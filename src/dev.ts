import { Language } from "./api/enums/Language";
import { RecipeSearchUuid } from "./api/enums/migusto/RecipeUuids";
import { MigrosAPI } from "./api/MigrosAPI";
import { IRecipeSearchOptions } from "./api/migusto/recipe-search";

(async () => {
  const recipeSearchOptions: IRecipeSearchOptions = {
    language: Language.DE,
    uuids: [
      RecipeSearchUuid.COURSE_MAINDISH,
      RecipeSearchUuid.TAG_QUICKANDEASY,
      RecipeSearchUuid.TAG_BURGER,
    ],
  };
  const response = await MigrosAPI.migusto.recipeSearch(recipeSearchOptions);
  console.log(response.recipes.map((x) => x.title + " " + x.id));
})();

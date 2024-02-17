import { describe, expect, test } from "@jest/globals";

import { MigrosAPI } from "../src";
import { Language } from "../src/api/enums/Language";
import { RecipeSearchUuid } from "../src/api/enums/migusto/RecipeUuids";
import { IRecipeSearchOptions } from "../src/api/migusto/recipe-search";

describe("Search for recipes", () => {
  test("Search for recipes with uuids", async () => {
    const recipeSearchOptions: IRecipeSearchOptions = {
      language: Language.DE,
      uuids: [
        RecipeSearchUuid.COURSE_MAINDISH,
        RecipeSearchUuid.TAG_QUICKANDEASY,
        RecipeSearchUuid.TAG_BURGER,
      ],
    };
    const response = await MigrosAPI.migusto.recipeSearch(recipeSearchOptions);
    const testRecipe = response.recipes.find((x) => x.id === "70820");
    expect(testRecipe?.title).toBe("Cheeseburger");
    const testRecipe2 = response.recipes.find((x) => x.id === "19497388");
    expect(testRecipe2?.title).toBe("Linsenburger");
  });
});

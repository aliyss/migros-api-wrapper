import { describe, expect, test } from "@jest/globals";

import { MigrosAPI } from "../src";
import { Language } from "../src/api/enums/Language";
import { IRecipeDetailOptions } from "../src/api/migusto/recipe-details";

describe("Get recipe details", () => {
  test("Get recipe details", async () => {
    const recipeDetailOptions: IRecipeDetailOptions = {
      slug: "lamingtons",
      language: Language.DE,
    };
    const response = await MigrosAPI.migusto.recipeDetails(recipeDetailOptions);
    expect(response.name).toBe("Lamingtons");
    expect(response.recipeCuisine).toBe("Australien");
  });
  test("Get recipe details (Italian)", async () => {
    const recipeDetailOptions: IRecipeDetailOptions = {
      slug: "lamington",
      language: Language.IT,
    };
    const response = await MigrosAPI.migusto.recipeDetails(recipeDetailOptions);
    expect(response.name).toBe("Lamington");
    expect(response.recipeCuisine).toBe("Australia");
  });
  test("Get recipe details (French)", async () => {
    const recipeDetailOptions: IRecipeDetailOptions = {
      slug: "risotto-a-la-salsiccia",
      language: Language.FR,
    };
    const response = await MigrosAPI.migusto.recipeDetails(recipeDetailOptions);
    expect(response.name).toBe("Risotto à la salsiccia");
    expect(response.recipeCuisine).toBe("Italie");
  });
});

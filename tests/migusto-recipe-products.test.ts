import { describe, expect, test } from "@jest/globals";

import { MigrosAPI } from "../src";
import { Language } from "../src/api/enums/Language";
import { IRecipeProductOptions } from "../src/api/migusto/recipe-products";

describe("Search for recipe products", () => {
  test("Search for recipe products", async () => {
    const recipeProductOptions: IRecipeProductOptions = {
      id: "70820",
      language: Language.DE,
    };
    const response =
      await MigrosAPI.migusto.recipeProducts(recipeProductOptions);
    expect(response.productIds).toContain("233520695510");
  });
});

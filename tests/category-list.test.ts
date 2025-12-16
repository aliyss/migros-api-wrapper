import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";

describe("Get a list of categories", () => {
  test("Retrieve Shopping List Categories", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const response = await MigrosAPI.products.shoppingList.listCategories({
      leshopch: guestInfo.token,
    });

    const idFruechte = response.find((x: any) => x.id === 7494732);
    if (!idFruechte) {
      throw new Error("Category not found");
    }
    expect(idFruechte.name.de).toBe("Früchte & Gemüse");
  });

  test("List Categories via Search", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const response = await MigrosAPI.products.productSearch.listCategories({
      leshopch: guestInfo.token,
    });

    const idFruechte = response.categories.find((x: any) => x.id === 7494732);
    if (!idFruechte) {
      throw new Error("Category not found");
    }
    expect(idFruechte.slug).toBe("fruits-vegetables");
  });
});

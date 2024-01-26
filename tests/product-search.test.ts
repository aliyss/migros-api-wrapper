import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductSearchBody } from "../src/api/onesearch-oc-seaapi/product-search";

describe("Search for a Product", () => {
  test("Search for salt", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSearchBody: IProductSearchBody = {
      query: "salt"
    };
    const response = await MigrosAPI.products.productSearch.searchProduct(
      productSearchBody,
      {
        leshopch: guestInfo.token
      }
    );
    expect(response.categories[0].name).toBe("Snacks & sweets");
  });
  test("Search for bread", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSearchBody: IProductSearchBody = {
      query: "bread"
    };
    const response = await MigrosAPI.products.productSearch.searchProduct(
      productSearchBody,
      {
        leshopch: guestInfo.token
      }
    );
    expect(response.categories[0].name).toBe("Bread, pastries & breakfast");
  });
});

import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { ICategoryListBody } from "../src/api/onesearch-oc-seaapi/category";

describe("Get a list of categories", () => {
  test("Search for Dairy", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const categoryListBody: ICategoryListBody = {
      from: 0,
      categoryId: 7494731,
    };
    const response = await MigrosAPI.products.productSearch.listCategories(
      categoryListBody,
      {
        leshopch: guestInfo.token,
      },
    );
    expect(response.categories[0].name).toBe(
      "Dairy, eggs & fresh convenience food",
    );
  });
});

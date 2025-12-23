import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";

describe("Search for Product Promotions", () => {
  test("Search for product promotion", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const response =
      await MigrosAPI.products.productDisplay.getProductPromotionSearch(
        {},
        { leshopch: guestInfo.token },
      );
    expect(Array.isArray(response.items)).toBe(true);
  });
});

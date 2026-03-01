import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductDetailOptions } from "../src/api/product-display/product-detail";

describe("Search for a Product Detail", () => {
  test("Search for salt", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductDetailOptions = {
      uids: "100001090",
    };
    const response = await MigrosAPI.products.productDisplay.getProductDetails(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("title");
  });
  test("Search for another salt", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductDetailOptions = {
      uids: "100047383",
    };
    const response = await MigrosAPI.products.productDisplay.getProductDetails(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("title");
  });
});

describe("Search for multiple Product Details", () => {
  test("Search for multiple salts", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductDetailOptions = {
      uids: ["100001090", "100047383"],
    };
    const response = await MigrosAPI.products.productDisplay.getProductDetails(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("title");
    expect(response[1]).toHaveProperty("title");
  });
});

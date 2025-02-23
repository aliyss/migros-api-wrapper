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
    expect(response[0].title).toBe(
      "Jura-Sel · Kochsalz · Fluor- und Jodhaltig",
    );
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
    expect(response[0].title).toBe("Jura-Sel · Speisesalz · Jodhaltig");
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
    expect(response[0].title).toBe(
      "Jura-Sel · Kochsalz · Fluor- und Jodhaltig",
    );
    expect(response[1].title).toBe("Jura-Sel · Speisesalz · Jodhaltig");
  });
});

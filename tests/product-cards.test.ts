import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductCardsOptions } from "../src/api/product-display/product-cards";

describe("Search for a Product Card", () => {
  test("Search for salt", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductCardsOptions = {
      productFilter: {
        uids: [100001090],
      },
    };
    const response = await MigrosAPI.products.productDisplay.getProductCards(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("name");
  });
  test("Search for bread", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductCardsOptions = {
      productFilter: {
        uids: [100005521],
      },
    };
    const response = await MigrosAPI.products.productDisplay.getProductCards(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("name");
  });
});

describe("Search for multiple Product Cards", () => {
  test("Search for multiple salts", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductCardsOptions = {
      productFilter: {
        uids: [100001090, 100047383],
      },
    };
    const response = await MigrosAPI.products.productDisplay.getProductCards(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("name");
    expect(response[1]).toHaveProperty("name");
  });
  test("Search for multiple breads", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productCardsOptions: IProductCardsOptions = {
      productFilter: {
        uids: [100005521, 100032626],
      },
    };
    const response = await MigrosAPI.products.productDisplay.getProductCards(
      productCardsOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0]).toHaveProperty("name");
    expect(response[1]).toHaveProperty("name");
  });
});

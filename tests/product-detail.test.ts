import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductDetailOptions } from "../src/api/product-display/product-detail";
import * as fs from 'fs';
import * as path from 'path';

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
    console.log('Salt Product Detail Response:', JSON.stringify(response, null, 2));
    // Save response to file
    fs.writeFileSync(
      path.join(__dirname, 'results/salt-detail.json'),
      JSON.stringify(response, null, 2)
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
    console.log('Another Salt Product Detail Response:', JSON.stringify(response, null, 2));
    // Save response to file
    fs.writeFileSync(
      path.join(__dirname, 'results/another-salt-detail.json'),
      JSON.stringify(response, null, 2)
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
    console.log('Multiple Salts Product Detail Response:', JSON.stringify(response, null, 2));
    // Save response to file
    fs.writeFileSync(
      path.join(__dirname, 'results/multiple-salts-detail.json'),
      JSON.stringify(response, null, 2)
    );
    expect(response[0].title).toBe(
      "Jura-Sel · Kochsalz · Fluor- und Jodhaltig",
    );
    expect(response[1].title).toBe("Jura-Sel · Speisesalz · Jodhaltig");
  });
});

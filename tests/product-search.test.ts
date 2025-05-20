import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductSearchBody } from "../src/api/onesearch-oc-seaapi/product-search";
import * as fs from 'fs';
import * as path from 'path';

describe("Search for a Product", () => {
  test("Search for salt", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSearchBody: IProductSearchBody = {
      query: "salt",
    };
    const response = await MigrosAPI.products.productSearch.searchProduct(
      productSearchBody,
      {
        leshopch: guestInfo.token,
      },
    );
    console.log('Salt Search Response:', JSON.stringify(response, null, 2));
    // Save response to file
    fs.writeFileSync(
      path.join(__dirname, 'results/salt-search.json'),
      JSON.stringify(response, null, 2)
    );
    expect(response.categories[0].name).toBe("Snacks & sweets");
  });
  test("Search for bread", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSearchBody: IProductSearchBody = {
      query: "bread",
    };
    const response = await MigrosAPI.products.productSearch.searchProduct(
      productSearchBody,
      {
        leshopch: guestInfo.token,
      },
    );
    console.log('Bread Search Response:', JSON.stringify(response, null, 2));
    // Save response to file
    fs.writeFileSync(
      path.join(__dirname, 'results/bread-search.json'),
      JSON.stringify(response, null, 2)
    );
    expect(response.categories[0].name).toBe("Bread, pastries & breakfast");
  });
});

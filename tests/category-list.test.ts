import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { ICategoryListBody } from "../src/api/onesearch-oc-seaapi/category";
import * as fs from 'fs';
import * as path from 'path';

describe("Get a list of categories", () => {
  test("Get all main categories", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    
    // Get all main categories (root level)
    const categoryListBody: ICategoryListBody = {
      from: 0,
      categoryId: 7494731, // Root category ID
      size: 1000 // Get a large number of categories
    };

    const response = await MigrosAPI.products.productSearch.listCategories(
      categoryListBody,
      {
        leshopch: guestInfo.token,
      }
    );

    console.log('All Categories Response:', JSON.stringify(response, null, 2));
    
    // Save categories to file
    fs.writeFileSync(
      path.join(__dirname, 'results/7494731-categories.json'),
      JSON.stringify(response, null, 2)
    );

    // Basic validation
    expect(response).toBeDefined();
    expect(response.features).toBeDefined();
    expect(response.features.length).toBeGreaterThan(0);
  });

  test("Get subcategories for a specific category", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    
    // Get subcategories for dairy (categoryId: 7494731)
    const categoryListBody: ICategoryListBody = {
      from: 0,
      categoryId: 7494731, // Dairy category ID
      size: 1000
    };

    const response = await MigrosAPI.products.productSearch.listCategories(
      categoryListBody,
      {
        leshopch: guestInfo.token,
      }
    );

    console.log('Dairy Subcategories Response:', JSON.stringify(response, null, 2));
    
    // Save subcategories to file
    fs.writeFileSync(
      path.join(__dirname, 'results/dairy-subcategories.json'),
      JSON.stringify(response, null, 2)
    );

    // Basic validation
    expect(response).toBeDefined();
    expect(response.features).toBeDefined();
    expect(response.features.length).toBeGreaterThan(0);
  });
});

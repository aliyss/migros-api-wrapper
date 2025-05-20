import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductSearchBody } from "../src/api/onesearch-oc-seaapi/product-search";
import { IProductDetailOptions } from "../src/api/product-display/product-detail";
import * as fs from 'fs';
import * as path from 'path';

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

describe("Get Products for Specific Categories", () => {
  test("Get all products for specified categories and their subcategories", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const mainCategoryIds = ["7494738"];

    const allProducts: { [categoryId: string]: any[] } = {};
    const allProductDetails: { [categoryId: string]: any[] } = {};

    const baseResultsDir = path.join(__dirname, "results");
    if (!fs.existsSync(baseResultsDir)) {
      fs.mkdirSync(baseResultsDir, { recursive: true });
    }

    console.log('Starting to fetch products for specified categories...');

    // Function to get all subcategories for a given category
    async function getAllSubcategories(categoryId: string): Promise<Category[]> {
      const categories: Category[] = [];
      try {
        const categoryListBody = {
          from: 0,
          categoryId: parseInt(categoryId),
          size: 1000
        };

        const categoryResponse = await MigrosAPI.products.productSearch.listCategories(
          categoryListBody,
          {
            leshopch: guestInfo.token,
          }
        );

        if (categoryResponse.features && categoryResponse.features.length > 0) {
          for (const feature of categoryResponse.features) {
            if (feature.id === 'category' && feature.values) {
              for (const category of feature.values) {
                categories.push({
                  id: category.slug,
                  name: category.value,
                  parentId: categoryId
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching subcategories for category ${categoryId}:`, error);
      }
      return categories;
    }

    // Function to process a single category
    async function processCategory(category: Category) {
      console.log(`Processing category: ${category.name} (${category.id})`);
      
      // Create sanitized category name for folder
      const sanitizedCategoryName = category.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .substring(0, 50);
      
      // Create category-specific directory with both ID and name
      const categoryDir = path.join(baseResultsDir, `${category.id}_${sanitizedCategoryName}`);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      allProducts[category.id] = [];
      allProductDetails[category.id] = [];

      let offset = 0;
      const pageSize = 1000;
      let hasMoreProducts = true;

      while (hasMoreProducts) {
        const productSearchBody: IProductSearchBody = {
          query: "",
          categoryId: parseInt(category.id),
          from: offset,
          size: pageSize
        };

        try {
          const searchResponse = await MigrosAPI.products.productSearch.searchProduct(
            productSearchBody,
            {
              leshopch: guestInfo.token,
            }
          );

          console.log(`Fetched ${searchResponse.productIds?.length || 0} products for category ${category.name} (${category.id}) at offset ${offset}`);

          if (!searchResponse.productIds || searchResponse.productIds.length === 0) {
            hasMoreProducts = false;
            break;
          }

          // Get detailed information for the current batch of products
          const productDetailOptions: IProductDetailOptions = {
            uids: searchResponse.productIds
          };

          const detailsResponse = await MigrosAPI.products.productDisplay.getProductDetails(
            productDetailOptions,
            { leshopch: guestInfo.token }
          );

          // Add products and their details to our arrays
          allProducts[category.id].push(...searchResponse.productIds);
          allProductDetails[category.id].push(...detailsResponse);

          // Save progress after each batch in the category-specific directory
          fs.writeFileSync(
            path.join(categoryDir, 'products.json'),
            JSON.stringify(allProducts[category.id], null, 2)
          );

          fs.writeFileSync(
            path.join(categoryDir, 'product-details.json'),
            JSON.stringify(allProductDetails[category.id], null, 2)
          );

          // Update offset for next batch
          offset += pageSize;

          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error processing category ${category.name} (${category.id}) at offset ${offset}:`, error);
          hasMoreProducts = false;
        }
      }

      // Save category summary in the category-specific directory
      const categorySummary = {
        categoryId: category.id,
        categoryName: category.name,
        parentId: category.parentId,
        totalProducts: allProducts[category.id].length,
        totalDetails: allProductDetails[category.id].length
      };

      fs.writeFileSync(
        path.join(categoryDir, 'summary.json'),
        JSON.stringify(categorySummary, null, 2)
      );
    }

    // Process each main category and its subcategories
    for (const mainCategoryId of mainCategoryIds) {
      // First get the main category name
      const mainCategoryResponse = await MigrosAPI.products.productSearch.listCategories(
        {
          from: 0,
          categoryId: parseInt(mainCategoryId),
          size: 1
        },
        {
          leshopch: guestInfo.token,
        }
      );

      let mainCategoryName = "Unknown";
      if (mainCategoryResponse.features && mainCategoryResponse.features.length > 0) {
        for (const feature of mainCategoryResponse.features) {
          if (feature.id === 'category' && feature.values && feature.values.length > 0) {
            mainCategoryName = feature.values[0].value;
            break;
          }
        }
      }

      // Process main category
      await processCategory({
        id: mainCategoryId,
        name: mainCategoryName
      });

      // Get and process all subcategories
      const subcategories = await getAllSubcategories(mainCategoryId);
      for (const subcategory of subcategories) {
        await processCategory(subcategory);
      }
    }

    // Save final results
    fs.writeFileSync(
      path.join(baseResultsDir, 'all-products-by-category.json'),
      JSON.stringify(allProducts, null, 2)
    );

    fs.writeFileSync(
      path.join(baseResultsDir, 'all-product-details-by-category.json'),
      JSON.stringify(allProductDetails, null, 2)
    );

    // Basic validation
    expect(Object.keys(allProducts).length).toBeGreaterThan(0);
    expect(Object.keys(allProductDetails).length).toBeGreaterThan(0);
  }, 1800000); // Increase timeout to 30 minutes since we're processing more categories
}); 
import { describe, expect, test } from '@jest/globals';
import MigrosAPI from "../src";
import { IProductSearchBody } from "../src/api/onesearch-oc-seaapi/product-search";

describe('Search for a Product', () => {
	test('Search for salt', async () => {
		const productSearchBody: IProductSearchBody = {
			query: "salt"
		}
		const response = await MigrosAPI.products.productSearch.searchProduct(productSearchBody)
		expect(response.categories[0].name).toBe("Salty Groceries");
	});
	test('Search for bread', async () => {
		const productSearchBody: IProductSearchBody = {
			query: "bread"
		}
		const response = await MigrosAPI.products.productSearch.searchProduct(productSearchBody)
		expect(response.categories[0].name).toBe("Bread & Bakery");
	});
});
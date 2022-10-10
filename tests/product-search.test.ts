import { describe, expect, test } from '@jest/globals';
import MigrosAPI from "../src";
import { IProductSearchBody } from "../src/api/onesearch-oc-seaapi/public/v4/product-search";

describe('Search for a Product', () => {
	test('Search for salt', async () => {
		const productSearchBody: IProductSearchBody = {
			query: "salt"
		}
		const response = await MigrosAPI.productSearch.v4.search(productSearchBody)
		expect(response.categories[0].name).toBe("Salty Groceries");
	});
	test('Search for bread', async () => {
		const productSearchBody: IProductSearchBody = {
			query: "bread"
		}
		const response = await MigrosAPI.productSearch.v4.search(productSearchBody)
		expect(response.categories[0].name).toBe("Bread & Bakery");
	});
});
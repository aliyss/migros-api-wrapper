import { describe, expect, test } from '@jest/globals';
import MigrosAPI from "../src";
import { IProductCardsOptions } from "../src/api/product-display/public/v1/product-cards";

describe('Search for a Product Detail', () => {
	test('Search for salt', async () => {
		const productCardsOptions: IProductCardsOptions = {
			uids: "100001090"
		}
		const response = await MigrosAPI.productDisplay.v1.productDetail.get(productCardsOptions)
		expect(response[0].title).toBe("Jura-Sel · Kochsalz · Fluor- und Jodhaltig");
	});
	test('Search for another salt', async () => {
		const productCardsOptions: IProductCardsOptions = {
			uids: "100047383"
		}
		const response = await MigrosAPI.productDisplay.v1.productDetail.get(productCardsOptions)
		expect(response[0].title).toBe("Jura-Sel · Speisesalz · Jodhaltig");
	});
});

describe('Search for multiple Product Details', () => {
	test('Search for multiple salts', async () => {
		const productCardsOptions: IProductCardsOptions = {
			uids: ["100001090", "100047383"]
		}
		const response = await MigrosAPI.productDisplay.v1.productDetail.get(productCardsOptions)
		expect(response[0].title).toBe("Jura-Sel · Kochsalz · Fluor- und Jodhaltig");
		expect(response[1].title).toBe("Jura-Sel · Speisesalz · Jodhaltig");
	});
});
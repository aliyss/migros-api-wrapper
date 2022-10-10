import { getProductCards } from "./product-cards";
import { getProductDetail } from "./product-detail";

export const v1 = {
	productCards: {
		get: getProductCards
	},
	productDetail: {
		get: getProductDetail
	}
}

import { StoreType } from "../../../enums/StoreType";
import { Region } from "../../../enums/Region";

import { getRequest } from "../../../../utils/requests";

import { paths } from "../../../apiPaths";

const url = paths["product-display"].public.v1 + "/product-cards"

export interface IProductCardsOptions extends Record<string, any> {
	uids: string | string[],
	storeType?: StoreType,
	region?: Region,
	newCategoryTree?: boolean,
	ongoingOfferDate?: string
}

const defaultProductCardsOptions: IProductCardsOptions = {
	uids: "",
	storeType: StoreType.OFFLINE,
	region: Region.NATIONAL
}

async function getProductCardsRequest(url: string, options: IProductCardsOptions): Promise<Record<string, any>> {

	if (Array.isArray(options.uids)) {
		options.uids = options.uids.join(",")
	}

	const headers = {
		'accept': "application/json, text/plain, *!/!*"
	}

	const response = await getRequest(url, options, headers)

	return response.body
}

export async function getProductCards(productCardOptions: IProductCardsOptions): Promise<any> {
	productCardOptions = { ...defaultProductCardsOptions, ...productCardOptions }
	return getProductCardsRequest(url, productCardOptions)
}
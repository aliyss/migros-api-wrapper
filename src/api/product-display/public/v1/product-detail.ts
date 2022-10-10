import { StoreType } from "../../../enums/StoreType";
import { Region } from "../../../enums/Region";

import { getRequest } from "../../../../utils/requests";

import { paths } from "../../../apiPaths";

const url = paths["product-display"].public.v1 + "/product-detail"

export interface IProductDetailOptions extends Record<string, any>{
	uids: string | string[],
	storeType?: StoreType,
	region?: Region
	newCategoryTree?: boolean
	warehouseId?: number,
	ongoingOfferDate?: string,
	migrosIds?: string
}

const defaultProductDetailOptions: IProductDetailOptions = {
	uids: "",
	storeType: StoreType.OFFLINE,
	region: Region.NATIONAL
}

async function getProductDetailRequest(url: string, options: IProductDetailOptions): Promise<Record<string, any>> {

	if (Array.isArray(options.uids)) {
		options.uids = options.uids.join(",")
	}

	const headers = {
		'accept': "application/json, text/plain, *!/!*"
	}

	const response = await getRequest(url, options, headers)

	return response.body
}

export async function getProductDetail(productDetailOptions: IProductDetailOptions): Promise<any> {
	productDetailOptions = { ...defaultProductDetailOptions, ...productDetailOptions }
	return getProductDetailRequest(url, productDetailOptions)
}
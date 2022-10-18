import { getRequest } from "../../utils/requests";

import { paths } from "../apiPaths";

const url = paths["marketablestock"].public.v1 + "/warehouses"

export interface IProductSupplyOptions extends Record<string, any> {
	pids: string | string[],
	warehouses: number
}

const defaultProductSupplyOptions: IProductSupplyOptions = {
	pids: "",
	warehouses: 0
}

async function getProductCardsRequest(url: string, options: IProductSupplyOptions, token: string): Promise<Record<string, any>> {

	if (Array.isArray(options.pids)) {
		options.pids = options.pids.join(",")
	}

	url += `/${options.warehouses}/products/${options.pids}`

	const headers = {
		'accept': "application/json, text/plain, */*",
		'leshopch': token
	}

	const response = await getRequest(url, {}, headers)

	return response.body
}

export async function getProductSupply(productSupplyOptions: IProductSupplyOptions, token: string): Promise<any> {
	productSupplyOptions = { ...defaultProductSupplyOptions, ...productSupplyOptions }
	return getProductCardsRequest(url, productSupplyOptions, token)
}
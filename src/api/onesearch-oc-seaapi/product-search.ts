import { Region } from "../enums/Region";
import { Language } from "../enums/Language";
import { Algorithm } from "../enums/Algorithm";
import { SortFields } from "../enums/SortFields";
import { SortOrder } from "../enums/SortOrder";

import { postRequest } from "../../utils/requests";

import { paths } from "../apiPaths";

const url = paths["onesearch-oc-seapi"].public.v4 + "/search"

// eslint-disable-next-line @typescript-eslint/naming-convention
export type IProductSearchOptions = Record<string, any>

const defaultProductSearchOptions: IProductSearchOptions = {}

export interface IProductSearchBody extends Record<string, any>{
	regionId?: Region,
	language?: Language,
	productIds?: string[],
	query: string,
	sortFields?: SortFields[],
	sortOrder?: SortOrder,
	algorithm?: Algorithm,
	filters?: Record<any, any>
}

const defaultProductSearchBody: IProductSearchBody = {
	regionId: Region.NATIONAL,
	language: Language.EN,
	productIds: [],
	query: "",
	sortFields: [],
	sortOrder: SortOrder.ASC,
	algorithm: Algorithm.DEFAULT
}

async function postProductSearchRequest(url: string, body: IProductSearchBody, options: IProductSearchOptions): Promise<Record<string, any>> {

	const headers = {
		'accept': "application/json, text/plain, *!/!*",
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'content-type': "application/json"
	}

	const response = await postRequest(url, body, options, headers)

	return response.body
}

export async function postProductSearch(productSearchBody: IProductSearchBody, productSearchOptions?: IProductSearchOptions): Promise<any> {
	productSearchOptions = { ...defaultProductSearchOptions, ...productSearchOptions }
	productSearchBody = { ...defaultProductSearchBody, ...productSearchBody }
	return postProductSearchRequest(url, productSearchBody, productSearchOptions)
}
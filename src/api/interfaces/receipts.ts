import { Currency } from "../enums/Currency";

export interface ICumulusReceiptEFTPayment {
	booking: {
		type: string,
		card: string
	},
	date: Date,
	total: number
}

export interface ICumulusReceiptArticle {
	product: string,
	count: number,
	price: {
		single: number,
		discount: number,
		total: number
	}
}

export interface ICumulusReceiptResponse {
	store: {
		cooperative: string,
		outlet: string
	},
	articles: ICumulusReceiptArticle[],
	discount: {
		rounding: number,
		total: number
	},
	total: {
		value: number,
		currency: Currency
	},
	payment: {
		value: number,
		type: string,
		return: number
	},
	eft: ICumulusReceiptEFTPayment | null,
	cumulus: {
		nr: string,
		points: {
			current: number,
			received: number
		}
	},
	details: {
		outlet: string,
		bed: string,
		box: string,
		bon: string,
		date: Date,
		letter: string
	}
}

export interface ICumulusReceiptsResponseItem {
	date: Date,
	outlet: string,
	total: {
		value: number,
		currency: Currency
	},
	points: {
		value: number
	},
	links: {
		html: string,
		pdf: string
	},
	id: string
}

export type ICumulusReceiptsResponse = Array<ICumulusReceiptsResponseItem>
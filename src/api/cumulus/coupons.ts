/* eslint-disable @typescript-eslint/naming-convention */
import { postRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { ICumulusCookies } from "../interfaces/cookies";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = migrosApiPaths["cumulus"] + "/service/api/coupon/activate?id=7623186011535&lang=de"

async function activateCumulusCouponRequest(url: string, cookies: ICumulusCookies): Promise<Record<string, any>> {

	const headers = {
		"accept": "*/*",
		"accept-language": "en-US,en;q=0.9",
		"sec-ch-ua": "\"Microsoft Edge\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Windows\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"x-requested-with": "XMLHttpRequest",
		"cookie": "JSESSIONID=; BIGipServerpool_shared_migros.ch_80=; cookie-banner-acceptance-state=",
		"Referer": "https://cumulus.migros.ch/de/coupons-und-angebote/digitale-coupons.html",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	}

	const response = await postRequest(url, null, {}, headers, cookies)

	return { body: response.body, ['set-cookie']: retrieveSetCookieFromHeaders(response.headers['set-cookie']) }
}

export async function activateCumulusCoupon(cookies: ICumulusCookies): Promise<any> {
	return activateCumulusCouponRequest(url, cookies)
}
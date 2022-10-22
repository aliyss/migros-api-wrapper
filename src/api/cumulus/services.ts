/* eslint-disable @typescript-eslint/naming-convention */
import { getRequest } from "../../utils/requests";

import { MigrosApiPaths } from "../apiPaths";
import { ILoginCookies } from "../interfaces/cookies";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = MigrosApiPaths["login"] + "/ma/api/content/teaser/services/small"

async function getCumulusServicesSmallRequest(url: string, cookies: ILoginCookies): Promise<Record<string, any>> {

	const headers = {
		"accept": "application/json, text/javascript, */*; q=0.01",
		"accept-language": "en-US,en;q=0.9",
		"content-type": "application/json",
		"sec-ch-ua": "\"Chromium\";v=\"106\", \"Microsoft Edge\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Windows\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"x-csrf-token": cookies.CSRF,
		"x-requested-with": "XMLHttpRequest",
		"Referer": "https://login.migros.ch/cumulus/dashboard",
		"Referrer-Policy": "same-origin"
	}

	const response = await getRequest(url, {}, headers, cookies)

	return { body: response.body, ['set-cookie']: retrieveSetCookieFromHeaders(response.headers['set-cookie']) }
}

export async function getCumulusServicesSmall(cookies: ILoginCookies): Promise<any> {
	return getCumulusServicesSmallRequest(url, cookies)
}
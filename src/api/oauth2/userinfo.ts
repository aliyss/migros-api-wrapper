/* eslint-disable @typescript-eslint/naming-convention */
import { getRequest } from "../../utils/requests";

import { paths } from "../apiPaths";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = paths["login"] + "/oauth2/userinfo"

async function getUserInfoRequest(url: string, token: string): Promise<Record<string, any>> {

	const headers = {
		"authorization": `Bearer ${token}`,
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "en-US,en;q=0.9",
		"DNT": "1",
		"Origin": "https://cumulus.migros.ch",
		"Sec-Fetch-Dest": "empty",
		"Sec-Fetch-Mode": "cors",
		"Sec-Fetch-Site": "same-site"
	}

	const response = await getRequest(url, {}, headers)

	return { body: response.body, ['set-cookie']: retrieveSetCookieFromHeaders(response.headers['set-cookie']) }
}

export async function getUserInfo(token: string): Promise<any> {
	return getUserInfoRequest(url, token)
}
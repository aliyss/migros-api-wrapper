/* eslint-disable @typescript-eslint/naming-convention */
import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { IAppDeviceSettings } from "../interfaces/device";
import { retrieveSetCookieFromHeaders } from "../../utils/retrieveSetCookieFromHeaders";

const url = migrosApiPaths["login"] + "/mobilepayment/devices"

async function getAllNotificationsRequest(token: string, appDeviceSettings: IAppDeviceSettings): Promise<Record<string, any>> {

	const headers = {
		'Host': 'mobile-app.migros.ch',
		'Connection': 'Keep-Alive',
		'Accept-Encoding': 'gzip',
		'User-Agent': 'okhttp/4.10.0',
		'Authorization': 'Bearer ' + token,
		// 'If-None-Match': '',
		...appDeviceSettings
	}

	const response = await getRequest(url, {}, headers)

	return { body: response.body, ['set-cookie']: retrieveSetCookieFromHeaders(response.headers['set-cookie']) }
}

export async function getAllNotifications(token: string, appDeviceSettings: IAppDeviceSettings): Promise<any> {
	return getAllNotificationsRequest(token, appDeviceSettings)
}
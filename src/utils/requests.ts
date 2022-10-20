import { appendParametersToUrl } from "./appendParametersToUrl";
import superagent, { SuperAgentRequest } from "superagent";
import { addCookieToHeaders } from "./addCookieToHeaders";

export function getRequest(url: string, options: Record<string, string>, headers: Record<string, string> = {}, cookies: Record<string, string> = {}): SuperAgentRequest {
	url = appendParametersToUrl(url, options)
	headers = addCookieToHeaders(headers, cookies)

	return superagent
		.get(url)
		.set(headers)
		.send()
}

export function postRequest(url: string, body: Record<string, any> | null, options: Record<string, string>, headers: Record<string, string> = {}, cookies: Record<string, string> = {}): SuperAgentRequest {
	url = appendParametersToUrl(url, options)
	headers = addCookieToHeaders(headers, cookies)

	return superagent
		.post(url)
		.set(headers)
		.send(body || undefined)
}
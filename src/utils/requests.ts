import { appendParametersToUrl } from "./appendParametersToUrl";
import superagent, { SuperAgentRequest } from "superagent";

export function getRequest(url: string, options: Record<string, string>, headers: Record<string, string> = {}): SuperAgentRequest {
	url = appendParametersToUrl(url, options)

	return superagent
		.get(url)
		.set(headers)
		.send()
}

export function postRequest(url: string, body: Record<string, any>, options: Record<string, string>, headers: Record<string, string> = {}): SuperAgentRequest {
	url = appendParametersToUrl(url, options)

	return superagent
		.post(url)
		.set(headers)
		.send(body)
}
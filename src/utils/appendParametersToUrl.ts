
export function appendParametersToUrl(url: string, parameters: Record<string, string>): string {
	if (Object.keys(parameters).length === 0) {
		return url
	}
	const parametersToAppend = Object.keys(parameters).map((key) => [key, parameters[key]].join("=")).join("&")
	return (url + "?" + parametersToAppend)
}
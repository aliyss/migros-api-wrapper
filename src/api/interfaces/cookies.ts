
// eslint-disable-next-line @typescript-eslint/naming-convention
export type ICookies = Record<string, string>

export interface ILoginCookies extends ICookies {
	["__VCAP_ID__"]: string,
	["MDID"]: string
	["JSESSIONID"]: string
	["CSRF"]: string
	["MLRM"]: string
	["MTID"]: string
	["hl"]: string
	["TS012f1684"]: string
}
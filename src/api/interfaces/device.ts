import { Language } from "../enums/Language";
import { Region } from "../enums/Region";
import { FeatureFlags } from "../enums/FeatureFlags";

export type IDeviceSettings = Record<string, any>

export interface IAppDeviceSettings extends IDeviceSettings {
	['x-app-build']: number
	['x-app-ecom-toggle']: boolean
	['x-app-migros-tracking-id']: string
	['x-siren-version']: number
	['x-app-famigros-loyalty']: boolean
	['x-app-cumulus-number']: number
	['x-route-version']: number
	['x-app-migros-cooperative']: Region
	['x-app-login-id']: string
	['x-feature-flags']: FeatureFlags[]
	['x-app-migusto-member']: boolean
	['Accept-Language']: Language
	['x-app-migros-zipcode']: number
	['x-app-version']: string
	['x-app-cumulus-enabled']: boolean
	['x-device-os']: string
	['x-device-os-version']: number
	['x-device-model']: string
	['x-device-id']: string
	['x-device-uuid']: string
	['x-device-scale']: string
	['x-device-width']: number
	['x-device-timestamp']: Date
	['x-app-request-sequence']: number
}
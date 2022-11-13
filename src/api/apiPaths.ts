/* eslint-disable @typescript-eslint/naming-convention */
const defaultMigrosApiPath = "https://www.migros.ch"

export const migrosApiPaths = {
	['onesearch-oc-seapi']: {
		public: {
			v4: defaultMigrosApiPath + '/onesearch-oc-seaapi/public/v4'
		}
	},
	['product-display']: {
		public: {
			v1: defaultMigrosApiPath + '/product-display/public/v1',
			v2: defaultMigrosApiPath + '/product-display/public/v2'
		}
	},
	'marketablestock': {
		public: {
			v1: defaultMigrosApiPath + '/marketablestock/public/v1/api'
		}
	},
	'login': 'https://login.migros.ch',
	'cumulus': 'https://cumulus.migros.ch'
}
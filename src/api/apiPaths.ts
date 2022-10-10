/* eslint-disable @typescript-eslint/naming-convention */
const defaultMigrosApiPath = "https://www.migros.ch"

export const paths = {
	'onesearch-oc-seapi':{
		public: {
			v4: defaultMigrosApiPath + '/onesearch-oc-seaapi/public/v4'
		}
	},
	'product-display':{
		public: {
			v1: defaultMigrosApiPath + '/product-display/public/v1'
		}
	}
}
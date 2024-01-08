/* eslint-disable @typescript-eslint/naming-convention */
const defaultMigrosApiPath = "https://www.migros.ch";

export const migrosApiPaths = {
  ["onesearch-oc-seapi"]: {
    public: {
      v4: defaultMigrosApiPath + "/onesearch-oc-seaapi/public/v4",
      v5: defaultMigrosApiPath + "/onesearch-oc-seaapi/public/v5",
    },
  },
  ["product-display"]: {
    public: {
      v1: defaultMigrosApiPath + "/product-display/public/v1",
      v2: defaultMigrosApiPath + "/product-display/public/v2",
    },
  },
  marketablestock: {
    public: {
      v1:
        defaultMigrosApiPath +
        "/marketablestock/public/v1/api/marketablestocks",
      v2:
        defaultMigrosApiPath +
        "/marketablestock/public/v2/api/marketablestocks",
    },
  },
  authentication: {
    public: {
      v1: defaultMigrosApiPath + "/authentication/public/v1/api",
    },
  },
  login: "https://login.migros.ch",
  cumulus: "https://cumulus.migros.ch",
  "mobile-app": "https://mobile-app.migros.ch",
  "mobile-api-gateway": "https://mobile-api-gateway.shop.migros.ch",
  "subito-go": "https://subito-go.migros.ch",
};

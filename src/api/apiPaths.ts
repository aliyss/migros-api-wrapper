/* eslint-disable @typescript-eslint/naming-convention */
const defaultMigrosApiPath = "https://www.migros.ch";
const defaultMigustoApiPath = "https://migusto.migros.ch";

export const migrosApiPaths = {
  ["onesearch-oc-seapi"]: {
    public: {
      v3: defaultMigrosApiPath + "/onesearch-oc-seaapi/public/v3",
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
  migusto: {
    recipes: {
      v1: defaultMigustoApiPath + "/.rest/recipes/v1",
    },
    recipeProducts: {
      v1: defaultMigustoApiPath + "/.rest/recipeProducts/v1",
    },
    recipeDetails: defaultMigustoApiPath,
  },
  login: "https://login.migros.ch",
  cumulus: "https://cumulus.migros.ch",
  "mobile-app": "https://mobile-app.migros.ch",
  "mobile-api-gateway": "https://mobile-api-gateway.shop.migros.ch",
  "subito-go": "https://subito-go.migros.ch",
};

import { productDisplay } from "./product-display";
import { productSearch } from "./onesearch-oc-seaapi";
import { marketableStock } from "./marketablestock";
import { oauth2 } from "./oauth2";
import { security } from "./security";
import { cumulus } from "./cumulus";
import { IProductSupplyOptions } from "./marketablestock/product-supply";
import { ICumulusCookies, ILoginCookies } from "./interfaces/cookies";
import {
  ICumulusReceiptOptions,
  ICumulusReceiptsOptions,
} from "./cumulus/receipts";
import { combineCookies } from "../utils/combineCookies";
import {
  ICumulusReceiptResponse,
  ICumulusReceiptsResponse,
} from "./interfaces/receipts";
import { IProductCardsOptions } from "./product-display/product-cards";
import {
  IProductSearchBody,
  IProductSearchOptions,
} from "./onesearch-oc-seaapi/product-search";
import { migusto } from "./migusto";
import {
  ICategoryListBody,
  ICategoryListOptions,
} from "./onesearch-oc-seaapi/category";

export class MigrosAPI {
  private _leShopToken: string | undefined;

  get leShopToken(): string {
    return <string>this._leShopToken;
  }

  set leShopToken(value: string) {
    this._leShopToken = value;
  }

  private _cumulusToken: string | undefined;

  get cumulusToken(): string {
    return <string>this._cumulusToken;
  }

  set cumulusToken(value: string) {
    this._cumulusToken = value;
  }

  private _loginCookies: ILoginCookies | undefined;

  get loginCookies(): ILoginCookies | undefined {
    return this._loginCookies;
  }

  set loginCookies(value: ILoginCookies | undefined) {
    this._loginCookies = value;
  }

  private _cumulusCookies: ICumulusCookies | undefined;

  get cumulusCookies(): ICumulusCookies | undefined {
    return this._cumulusCookies;
  }

  set cumulusCookies(value: ICumulusCookies | undefined) {
    this._cumulusCookies = value;
  }

  static products = {
    productStock: marketableStock,
    productDisplay: productDisplay,
    productSearch: productSearch,
  };
  static account = {
    oauth2: oauth2,
    security: security,
    cumulus: cumulus,
  };
  static migusto = {
    recipeSearch: migusto.recipeSearch,
    recipeProducts: migusto.recipeProducts,
    recipeDetails: migusto.recipeDetails,
  };

  products = {
    productStock: {
      getProductSupply: async (
        productSupplyOptions: IProductSupplyOptions,
        token: string | undefined = this.leShopToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("LeShop Token is undefined");
        }
        return await marketableStock.getProductSupply(productSupplyOptions, {
          leshopch: token,
        });
      },
    },
    productDisplay: {
      getProductCards: async (
        productCardOptions: IProductCardsOptions,
        token: string | undefined = this.leShopToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("LeShop Token is undefined");
        }
        return await productDisplay.getProductCards(productCardOptions, {
          leshopch: token,
        });
      },
      getProductDetails: async (
        productSupplyOptions: IProductSupplyOptions,
        token: string | undefined = this.leShopToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("LeShop Token is undefined");
        }
        return await productDisplay.getProductDetails(productSupplyOptions, {
          leshopch: token,
        });
      },
    },
    productSearch: {
      categoryList: async (
        categoryListBody: ICategoryListBody,
        categoryListOptions?: ICategoryListOptions,
        token: string | undefined = this.leShopToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("LeShop Token is undefined");
        }
        return await productSearch.listCategories(
          categoryListBody,
          {
            leshopch: token,
          },
          categoryListOptions,
        );
      },
      searchProduct: async (
        productSearchBody: IProductSearchBody,
        productSearchOptions?: IProductSearchOptions,
        token: string | undefined = this.leShopToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("LeShop Token is undefined");
        }
        return await productSearch.searchProduct(
          productSearchBody,
          {
            leshopch: token,
          },
          productSearchOptions,
        );
      },
    },
  };

  account = {
    oauth2: {
      loginGuestToken: async (): Promise<any> => {
        const guestInfo = await oauth2.getGuestToken();
        this.leShopToken = guestInfo.token;
        return await guestInfo;
      },
      getUserInfo: async (
        token: string | undefined = this.cumulusToken,
      ): Promise<any> => {
        if (!token) {
          throw Error("Cumulus Token is undefined");
        }
        return await oauth2.getUserInfo(token);
      },
    },
    security: {
      getOptions: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await security.getOptions(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getPaymentDevices: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await security.getPaymentDevices(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
    },
    cumulus: {
      getCumulusStats: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusStats(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusReceipt: async (
        cumulusReceiptOptions: ICumulusReceiptOptions,
        cookies: ICumulusCookies | undefined = this.cumulusCookies,
        htmlOnly = false,
      ): Promise<ICumulusReceiptResponse | string> => {
        if (!cookies) {
          throw Error("Cumulus Cookies are undefined");
        }
        return await cumulus.getCumulusReceipt(
          cumulusReceiptOptions,
          cookies,
          htmlOnly,
        );
      },
      getCumulusReceiptFromUrl: async (
        url: string,
        cookies: ICumulusCookies | undefined = this.cumulusCookies,
        htmlOnly = false,
      ): Promise<ICumulusReceiptResponse | string> => {
        if (!cookies) {
          throw Error("Cumulus Cookies are undefined");
        }
        return await cumulus.getCumulusReceiptFromUrl(url, cookies, htmlOnly);
      },
      getCumulusReceipts: async (
        cumulusReceiptsOptions: ICumulusReceiptsOptions,
        cookies: ICumulusCookies | undefined = this.cumulusCookies,
      ): Promise<ICumulusReceiptsResponse> => {
        if (!cookies) {
          throw Error("Cumulus Cookies are undefined");
        }
        return await cumulus.getCumulusReceipts(
          cumulusReceiptsOptions,
          cookies,
        );
      },
      getCumulusPrincipal: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusPrincipal(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusServicesSmall: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusServicesSmall(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusPaymentSites: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusPaymentSites(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusCreditCard: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusCreditCard(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusHousehold: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusHousehold(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
      getCumulusInvoice: async (
        cookies: ILoginCookies | undefined = this.loginCookies,
      ): Promise<any> => {
        if (!cookies) {
          throw Error("Login Cookies are undefined");
        }
        const { body, "set-cookie": setCookie } =
          await cumulus.getCumulusInvoice(cookies);
        this.loginCookies = <ILoginCookies>combineCookies(cookies, setCookie);
        return body;
      },
    },
  };
}

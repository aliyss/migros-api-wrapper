import { MigrosAPI } from "./api/MigrosAPI";
import { IProductSupplyOptions } from "./api/marketablestock/product-supply";

(async () => {
  const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
  const productSearchBody: IProductSupplyOptions = {
    pids: "4963004",
    warehouses: 1,
  };
  const response = await MigrosAPI.products.productStock.getProductSupply(
    productSearchBody,
    {
      leshopch: guestInfo.token,
    },
  );

  console.log(response);
})();

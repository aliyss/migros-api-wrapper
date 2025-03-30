import { MigrosAPI } from "./api/MigrosAPI";

(async () => {
  const response = await MigrosAPI.account.oauth2.getGuestToken();
  const products = await MigrosAPI.products.productStock.getProductSupply(
    {
      pids: "100024405",
      costCenterIds: "0150180",
    },
    { leshopch: response.token },
  );
  console.log(products);
})();

import { MigrosAPI } from "./api/MigrosAPI";

(async () => {
  const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
  const response = await MigrosAPI.products.productSearch.listCategories({
    leshopch: guestInfo.token,
  });

  console.log(response);
})();

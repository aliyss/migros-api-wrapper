import { MigrosAPI } from "./api/MigrosAPI";

(async () => {
  const response = await MigrosAPI.account.oauth2.getGuestToken();
  console.log(response);
})();

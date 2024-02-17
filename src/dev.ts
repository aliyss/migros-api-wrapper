import { MigrosAPI } from "./api/MigrosAPI";

(async () => {
  const response = await MigrosAPI.account.cumulus.getCumulusSession({
    JSESSIONID: "",
    INGRESSCOOKIE: ".",
  });
  const response2 = await MigrosAPI.account.cumulus.getCumulusSession({
    JSESSIONID: response["set-cookie"]["JSESSIONID"],
    INGRESSCOOKIE: ".",
  });
  console.log(response2);
})();

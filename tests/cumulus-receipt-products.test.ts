import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import * as dotenv from "dotenv";
import path from "path";

describe("Check for Migros Cumulus Receipt Products", () => {
  test("Retrieve Cumulus Receipt Products", async () => {
    dotenv.config({ path: path.join(__dirname, "../.env") });
    if (
      !process.env.CUMULUS_JSESSIONID ||
      !(process.env.CUMULUS_VCAP_ID && process.env.CUMULUS_CSRF)
    ) {
      console.log("Please provide JSESSIONID and INGRESSCOOKIE in .env");
      return;
    }
    const cookies = {
      ["cookie-banner-acceptance-state"]: "true",
      JSESSIONID: process.env.CUMULUS_JSESSIONID,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __VCAP_ID__: process.env.CUMULUS_VCAP_ID,
      CSRF: process.env.CUMULUS_CSRF,
    };
    const responseReceipts = await MigrosAPI.account.cumulus.getCumulusReceipts(
      {
        dateFrom: new Date("01.01.2024"),
      },
      cookies,
    );
    expect(Array.isArray(responseReceipts)).toBe(true);
    expect(responseReceipts).not.toHaveLength(0);
    const response = await MigrosAPI.account.cumulus.getCumulusReceiptProducts(
      {
        transactionId: responseReceipts[0].transactionId,
      },
      cookies,
    );
    expect(typeof response).toBe("object");
    expect(Object.keys(response)).not.toHaveLength(0);
  });
});

import { describe, test, expect } from "@jest/globals";
import { MigrosAPI } from "../src";
import * as dotenv from "dotenv";
import path from "path";

describe("Check for Migros Cumulus Receipt", () => {
  test("Retrieve Cumulus Receipt", async () => {
    dotenv.config({ path: path.join(__dirname, "../.env") });
    if (!process.env.CUMULUS_JSESSIONID || !process.env.CUMULUS_INGRESSCOOKIE) {
      console.log("Please provide JSESSIONID and INGRESSCOOKIE in .env");
      return;
    }
    const responseReceipts = await MigrosAPI.account.cumulus.getCumulusReceipts(
      {
        from: new Date("01.12.2023"),
        to: new Date(),
      },
      {
        ["cookie-banner-acceptance-state"]: "true",
        JSESSIONID: process.env.CUMULUS_JSESSIONID,
        INGRESSCOOKIE: process.env.CUMULUS_INGRESSCOOKIE,
      },
    );
    expect(responseReceipts).toBeInstanceOf(Array);
    const response = await MigrosAPI.account.cumulus.getCumulusReceipt(
      {
        receiptId: responseReceipts[0].id,
      },
      {
        JSESSIONID: process.env.CUMULUS_JSESSIONID,
        INGRESSCOOKIE: process.env.CUMULUS_INGRESSCOOKIE,
      },
    );
    expect(response).toHaveProperty("cumulus");
  });
});

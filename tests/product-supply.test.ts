import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductSupplyOptions } from "../src/api/marketablestock/product-supply";

describe("Check for a Products Supply", () => {
  test("Search for 228006", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSupplyOptions: IProductSupplyOptions = {
      pids: "100024405",
      costCenterIds: "0150180",
    };
    const response = await MigrosAPI.products.productStock.getProductSupply(
      productSupplyOptions,
      { leshopch: guestInfo.token },
    );
    expect(response.catalogItemId.toString()).toBe(productSupplyOptions.pids);
    expect(response.availabilities[0].id.toString()).toBe(
      productSupplyOptions.costCenterIds,
    );
  });
});

import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { IProductSupplyOptions } from "../src/api/marketablestock/product-supply";

describe("Check for a Products Supply", () => {
  test("Search for 4963004", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSupplyOptions: IProductSupplyOptions = {
      pids: "4963004",
      warehouses: 1,
    };
    const response = await MigrosAPI.products.productStock.getProductSupply(
      productSupplyOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0].infiniteSupply).toBe(false);
    expect(response[0].pid).toBe(4963004);
  });
  test("Search for 228006", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSupplyOptions: IProductSupplyOptions = {
      pids: "228006",
      warehouses: 1,
    };
    const response = await MigrosAPI.products.productStock.getProductSupply(
      productSupplyOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0].infiniteSupply).toBe(false);
    expect(response[0].pid).toBe(228006);
  });
});

describe("Check for multiple Products Supplies", () => {
  test("Search for 4963004 and 228006", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const productSupplyOptions: IProductSupplyOptions = {
      pids: ["4963004", "228006"],
      warehouses: 1,
    };
    const response = await MigrosAPI.products.productStock.getProductSupply(
      productSupplyOptions,
      { leshopch: guestInfo.token },
    );
    expect(response[0].infiniteSupply).toBe(false);
    expect(response[0].pid).toBe(4963004);
    expect(response[1].infiniteSupply).toBe(false);
    expect(response[1].pid).toBe(228006);
  });
});

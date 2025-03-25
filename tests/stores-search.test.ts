import { describe, expect, test } from "@jest/globals";
import { MigrosAPI } from "../src";
import { ISearchStoresOptions } from "../src/api/stores/search-stores";

describe("Check for a Products Supply", () => {
  test("Search for 228006", async () => {
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
    const searchStoresOptions: ISearchStoresOptions = {
      query: "Nieder",
    };
    const response = await MigrosAPI.stores.searchStores(searchStoresOptions, {
      leshopch: guestInfo.token,
    });
    expect(response[0]).toHaveProperty("storeId");
  });
});

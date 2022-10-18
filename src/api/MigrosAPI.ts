import { productDisplay } from "./product-display";
import { productSearch } from "./onesearch-oc-seaapi";
import { marketableStock } from "./marketablestock";
import { oauth2 } from "./oauth2";
import { security } from "./security";
import { cumulus } from "./cumulus";

export class MigrosAPI {
	static products = {
		productStock: marketableStock,
		productDisplay: productDisplay,
		productSearch: productSearch
	}
	static account = {
		oauth2: oauth2,
		security: security,
		cumulus: cumulus
	}
}
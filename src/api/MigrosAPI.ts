import { productDisplay } from "./product-display/public";
import { productSearch } from "./onesearch-oc-seaapi/public";
import { productStock } from "./marketablestock/public";
import { oauth2 } from "./oauth2";
import { security } from "./security";
import { cumulus } from "./cumulus";

export class MigrosAPI {
	static productDisplay = productDisplay
	static productSearch = productSearch
	static productStock = productStock
	static oauth2 = oauth2
	static security = security
	static cumulus = cumulus
}
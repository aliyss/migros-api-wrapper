import { getCumulusStats } from "./stats";
import { getCumulusReceipt, getCumulusReceiptFromUrl, getCumulusReceipts } from "./receipts";

export const cumulus = {
	getCumulusStats: getCumulusStats,
	getCumulusReceipt: getCumulusReceipt,
	getCumulusReceiptFromUrl: getCumulusReceiptFromUrl,
	getCumulusReceipts: getCumulusReceipts
}

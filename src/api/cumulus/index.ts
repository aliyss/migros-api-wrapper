import { getCumulusStats } from "./stats";

import {
  getCumulusReceipt,
  getCumulusReceiptFromUrl,
  getCumulusReceipts,
} from "./receipts";
import { getCumulusPrincipal } from "./principal";
import { getCumulusServicesSmall } from "./services";
import { getCumulusPaymentSites } from "./payment-sites";
import { getCumulusCreditCard } from "./credit-card";
import { getCumulusHousehold } from "./household";
import { getCumulusInvoice } from "./invoice";

export const cumulus = {
  getCumulusStats: getCumulusStats,
  getCumulusReceipt: getCumulusReceipt,
  getCumulusReceiptFromUrl: getCumulusReceiptFromUrl,
  getCumulusReceipts: getCumulusReceipts,
  getCumulusPrincipal: getCumulusPrincipal,
  getCumulusServicesSmall: getCumulusServicesSmall,
  getCumulusPaymentSites: getCumulusPaymentSites,
  getCumulusCreditCard: getCumulusCreditCard,
  getCumulusHousehold: getCumulusHousehold,
  getCumulusInvoice: getCumulusInvoice,
};

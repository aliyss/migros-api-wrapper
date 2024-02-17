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
import { getCumulusSession } from "./session";

export const cumulus = {
  getCumulusSession: getCumulusSession,
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

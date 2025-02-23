/* eslint-disable @typescript-eslint/naming-convention */

import * as cheerio from "cheerio";

import { getRequest } from "../../utils/requests";

import { migrosApiPaths } from "../apiPaths";
import { ICumulusCookies } from "../interfaces/cookies";
import { Language } from "../enums/Language";
import {
  ICumulusReceiptArticle,
  ICumulusReceiptResponse,
} from "../interfaces/receipts";
import { Currency } from "../enums/Currency";

const urlExport = migrosApiPaths["account"].purchases.receipts;
const urlList = migrosApiPaths["account"].purchases.receipts;

export interface ICumulusReceiptOptions extends Record<string, any> {
  transactionId: string;
  fallbackLanguage?: Language;
}

const defaultCumulusReceiptOptions: ICumulusReceiptOptions = {
  transactionId: "",
  fallbackLanguage: Language.DE,
  type: "HTML",
};

async function getCumulusReceiptRequest(
  url: string,
  options: ICumulusReceiptOptions | Record<string, string>,
  cookies: ICumulusCookies,
  htmlOnly: boolean,
): Promise<ICumulusReceiptResponse | string> {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.5",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "X-CSRF-TOKEN": cookies.CSRF || "",
    Referer: "https://account.migros.ch/purchases/receipts",
  };

  const response = await getRequest(url, options, headers, cookies);

  if (!response.text) {
    throw new Error("No receipt has been found!");
  }

  if (htmlOnly) {
    return await response.text();
  }

  const $ = cheerio.load(await response.text());

  const articles = $("[class='article pre']").text().split("\n");
  const store = $("[class='store text-center pre']").text().split("\n");
  const discountRounding = $("[class='discount pre']")
    .text()
    .trim()
    .split(/\s\s+/)[1];
  const discountTotal = $("[class='discounttotal pre']")
    .text()
    .trim()
    .split(/\s\s+/)[1];
  const totalCost = $("[class='total pre']").text().trim().split(/\s+/);
  const payment = $("[class='payment pre']").text().split("\n");
  const eftPayment = $("[class='eftpayments pre']").text().split("\n");
  const cumulus = $("[class='cumukus pre']").text().split("\n");
  const footer = $("[class='footer pre']").text().split("\n");

  const receiptArticles: ICumulusReceiptArticle[] = [];

  // eslint-disable-next-line no-loops/no-loops
  for (let i = 2; i < articles.length - 1; i++) {
    const receiptArticleStringArray = articles[i].trim().split(/\s\s+/);
    receiptArticles.push({
      product: receiptArticleStringArray[0],
      count: parseFloat(receiptArticleStringArray[1]),
      price: {
        single: parseFloat(receiptArticleStringArray[2]),
        discount:
          receiptArticleStringArray.length === 6
            ? parseFloat(receiptArticleStringArray[3])
            : 0,
        total:
          receiptArticleStringArray.length === 6
            ? parseFloat(receiptArticleStringArray[4])
            : parseFloat(receiptArticleStringArray[3]),
      },
    });
  }

  return {
    store: {
      cooperative: store[0].trim(),
      outlet: store[1]?.trim(),
    },
    articles: receiptArticles,
    discount: {
      rounding: discountRounding
        ? parseFloat(discountRounding.split("-")[0])
        : 0,
      total: parseFloat(discountTotal) || 0,
    },
    total: {
      value: parseFloat(totalCost[2]),
      currency: <Currency>totalCost[1],
    },
    payment: {
      value: parseFloat(payment[0].trim().split(/\s\s+/)[1]?.trim()),
      type: payment[0].trim().split(/\s\s+/)[0].trim(),
      return: payment[1]
        ? parseFloat(payment[1].trim().split(/\s\s+/)[1]?.trim())
        : 0,
    },
    eft: eftPayment
      ? {
          booking: {
            type: eftPayment[1]?.trim().split(/\s\s+/)[1]?.trim(),
            card: eftPayment[2]?.trim(),
          },
          date: new Date(
            +eftPayment[3]?.trim().split(/\s\s+/)[0].trim().split(".")[2],
            +eftPayment[3]?.trim().split(/\s\s+/)[0].trim().split(".")[1] - 1,
            +eftPayment[3]?.trim().split(/\s\s+/)[0].trim().split(".")[0],
            +eftPayment[3]?.trim().split(/\s\s+/)[1].trim().split(":")[0],
            +eftPayment[3]?.trim().split(/\s\s+/)[1].trim().split(":")[1],
            0,
          ),
          total: parseFloat(eftPayment[5]?.trim().split(/\s\s+/)[1].trim()),
        }
      : null,
    cumulus: {
      nr: cumulus[2]?.trim().split(/\s\s+/)[1],
      points: {
        current: parseFloat(cumulus[3]?.trim().split(/\s\s+/)[1]),
        received: parseFloat(cumulus[4]?.trim().split(/\s\s+/)[1]),
      },
    },
    details: {
      outlet: footer[2]?.trim().split(/\s\s+/)[0],
      bed: footer[2]?.trim().split(/\s\s+/)[1],
      box: footer[2]?.trim().split(/\s\s+/)[2],
      bon: footer[2]?.trim().split(/\s\s+/)[3],
      date: new Date(
        +footer[2]?.trim().split(/\s\s+/)[4].split(".")[2],
        +footer[2]?.trim().split(/\s\s+/)[4].split(".")[1] - 1,
        +footer[2]?.trim().split(/\s\s+/)[4].split(".")[0],
        +footer[2]?.trim().split(/\s\s+/)[5].split(":")[0],
        +footer[2]?.trim().split(/\s\s+/)[5].split(":")[1],
        +footer[2]?.trim().split(/\s\s+/)[5].split(":")[2],
      ),
      letter: footer[2]?.trim().split(/\s\s+/)[6].trim(),
    },
  };
}

export async function getCumulusReceipt(
  cumulusReceiptOptions: ICumulusReceiptOptions,
  cookies: ICumulusCookies,
  htmlOnly = false,
): Promise<ICumulusReceiptResponse | string> {
  cumulusReceiptOptions = {
    ...defaultCumulusReceiptOptions,
    ...cumulusReceiptOptions,
  };
  return getCumulusReceiptRequest(
    urlExport + "/" + cumulusReceiptOptions.receiptId,
    cumulusReceiptOptions,
    cookies,
    htmlOnly,
  );
}

export async function getCumulusReceiptFromUrl(
  url: string,
  cookies: ICumulusCookies,
  htmlOnly = false,
): Promise<ICumulusReceiptResponse | string> {
  url = migrosApiPaths["cumulus"] + url;
  return getCumulusReceiptRequest(url, {}, cookies, htmlOnly);
}

function convertDateToCumulusDateString(date: Date): string {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}

export interface ICumulusReceiptsOptions extends Record<string, any> {
  dateFrom: Date;
  dateTo?: Date;
}

const defaultCumulusReceiptsOptions: ICumulusReceiptsOptions = {
  dateFrom: new Date(),
  dateTo: new Date(),
};

async function getCumulusReceiptsRequest(
  url: string,
  options: ICumulusReceiptsOptions,
  cookies: ICumulusCookies,
): Promise<any> {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.5",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "X-CSRF-TOKEN": cookies.CSRF || "",
    Referer: "https://account.migros.ch/purchases/receipts",
  };

  const newOptions = {
    dateFrom: convertDateToCumulusDateString(options.dateFrom),
    dateTo: convertDateToCumulusDateString(options.dateTo || new Date()),
  };

  const response = await getRequest(url, newOptions, headers, cookies);
  return await response.json();
}

export async function getCumulusReceipts(
  cumulusReceiptsOptions: ICumulusReceiptsOptions,
  cookies: ICumulusCookies,
): Promise<any> {
  cumulusReceiptsOptions = {
    ...defaultCumulusReceiptsOptions,
    ...cumulusReceiptsOptions,
  };
  return getCumulusReceiptsRequest(urlList, cumulusReceiptsOptions, cookies);
}

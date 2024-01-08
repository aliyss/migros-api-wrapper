# migros-api-wrapper
Making the api of migros more accessible to the public.

## Disclaimer
The developers of this module are in no way endorsed by or affiliated with
Migros Online AG, or any associated subsidiaries, logos or trademarks.

## Up-to-date
The api of Migros is constantly changing in small ways. Feel free to open an issue if you encounter stuff not working.
I don't use it daily as of yet, but like to keep stuff up-to-date. Otherwise check my bio for the discord server.

## Installation
```npm install --save migros-api-wrapper```

## Usage Example

```typescript
import { MigrosAPI, ILoginCookies } from "migros-api-wrapper";

main();

async function main() {
	// Search for products matching a certain string.
    const guestInfo = await MigrosAPI.account.oauth2.getGuestToken();
	const responseProductSearch = await MigrosAPI.products.productSearch.searchProduct({
        query: "cooking salt",
        { leshopch: guestInfo.token }
	})
	console.log(responseProductSearch)

	// Certain API Calls need cookies to be accessed.
	// For more accessible options and automatic logins check the IamQuiteHungry Repository: https://github.com/Aliyss/IAmQuiteHungry
	const loginCookies: ILoginCookies = {
		__VCAP_ID__: "",
		MDID: "",
		JSESSIONID: "",
		CSRF: "",
		MLRM: "",
		MTID: "",
		hl: "",
		TS012f1684: ""
	}
	// Get security options of your MigrosAPI Account
	const securityOptions = await MigrosAPI.account.security.getOptions(loginCookies)
	console.log(securityOptions)
}
```

## API Paths

Currently following api paths are being considered:

```
├── www.migros.ch
|  ├── onesearch-oc-seaapi
|  |  └── public
|  |     └── v5
|  |        └── search
|  ├── product-display
|  |  └── public
|  |     ├── v2
|  |     |  └── product-detail
|  |     └── v2
|  |        └── product-cards
|  └── marketablestock
|     └── public
|        └── v1
|           └── api
|              ├── warehouses
|              |  └── [warehouseId]
|              |     └── products
|              └── product-detail
├── login.migros.ch
|  ├── security
|  |  └── options
|  ├── oauth2
|  |  └── userinfo
|  ├── cumulus
|  |  └── dashboard
|  |     ├── invoice
|  |     ├── stats
|  |     └── household
|  ├── ma
|  |  └── api
|  |     ├── content
|  |     |   └── teaser
|  |     |   |  └── services
|  |     |   |     └── small
|  |     |   └── payment
|  |     |      └── sites
|  |     ├── user
|  |     |   └── cumulus
|  |     |      └── credit-card
|  |     └── principal
|  └── mobilepayment
|     └── devices
├── cumulus.migros.ch
|  └── service
|     ├── avantaReceiptExport
|     |  └── html
|     └── api
|        └── coupon
|           └── activate
├── mobile-app.migros.ch (not yet implemented)
|  └── prepare
|     └── shl
|        └── sync
└── mobile-api-gateway.shop.migros.ch (not yet implemented)
   └── mobile-api-gateway
      └── public
         └── retentionapi
            └── v1
               └── customer-messages
```

Feel free to open an issue or a pull request for additional api paths.

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ICookies = Record<string, string | undefined>;

export interface ILoginCookies extends ICookies {
  ["__VCAP_ID__"]: string;
  ["MDID"]: string;
  ["JSESSIONID"]: string;
  ["INGRESSCOOKIE"]: string;
  ["CSRF"]: string;
  ["MLRM"]: string;
  ["MTID"]: string;
  ["hl"]: string;
  ["TS012f1684"]: string;
}

export type ICumulusCookies = ICookies &
  (
    | {
        ["BIGipServerpool_shared_migros.ch_80"]?: string;
        ["REALPERSON_SESSION"]?: string;
        ["cookie-banner-acceptance-state"]?: string;
        ["mo-fulfilmentOption"]?: string;
        ["mo-sidebarsState"]?: string;
        ["mo-lang"]?: string;
        ["mo-securityContext"]?: string;
        ["JSESSIONID"]: string;
        ["INGRESSCOOKIE"]: string;
      }
    | {
        ["BIGipServerpool_shared_migros.ch_80"]?: string;
        ["REALPERSON_SESSION"]?: string;
        ["cookie-banner-acceptance-state"]?: string;
        ["mo-fulfilmentOption"]?: string;
        ["mo-sidebarsState"]?: string;
        ["mo-lang"]?: string;
        ["mo-securityContext"]?: string;
        ["JSESSIONID"]: string;
        ["__VCAP_ID__"]: string;
        ["CSRF"]: string;
      }
  );

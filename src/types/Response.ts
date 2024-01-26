/* eslint-disable @typescript-eslint/naming-convention */
import { Headers } from "./Headers";

interface Body {
  readonly body: any | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<any>;
  blob(): Promise<any>;
  formData(): Promise<any>;
  json(): Promise<any>;
  text(): Promise<string>;
}

export interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: any;
  readonly url: string;
  clone(): Response;
}

import { CustomFetchConfig } from '@portkey/rn-sdk/src/packages/utils/fetch';

export interface RequestConfig extends CustomFetchConfig {
  baseURL?: string;
  url?: string;
}

export type UrlObj = { [key: string]: RequestConfig };

export type API_REQ_FUNCTION = (config?: RequestConfig) => Promise<{ type: 'timeout' } | any>;

export type BaseConfig = string | { target: string; config: CustomFetchConfig };

import { SCHEME_ACTION } from '@portkey/rn-sdk/src/constants/scheme';
import type { ParsedQuery } from 'query-string';

export type ErrorType = {
  errorMsg: string;
  isError: boolean;
  isWarning?: boolean;
};

export type SchemeParsedUrl = {
  domain: string;
  action: SCHEME_ACTION;
  query: ParsedQuery<string>;
};

export type LinkDappData = {
  url: string;
};

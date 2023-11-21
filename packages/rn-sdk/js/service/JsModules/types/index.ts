export interface BaseJSModule {
  [x: string | symbol]: (params: any) => Promise<void>;
}

export interface BaseMethodParams {
  eventId: string;
}

export interface BaseMethodResult {
  status: 'success' | 'fail';
  transactionId?: string;
  data?: any;
  error?: any;
}

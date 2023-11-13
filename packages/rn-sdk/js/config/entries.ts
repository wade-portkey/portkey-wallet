export enum PortkeyEntries {
  TEST = 'test',

  SIGN_IN_ENTRY = 'sign_in_entry',
  SIGN_UP_ENTRY = 'sign_up_entry',
  SELECT_COUNTRY_ENTRY = 'select_country_entry',
  GUARDIAN_APPROVAL_ENTRY = 'guardian_approval_entry',
  VERIFIER_DETAIL_ENTRY = 'verifier_detail_entry',
  GUARDIAN_HOME_ENTRY = 'guardian_home_entry',

  CHECK_PIN = 'check_pin_entry',
  SET_PIN = 'set_pin_entry',
  CONFIRM_PIN = 'confirm_pin_entry',

  ACCOUNT_SETTING_ENTRY = 'account_setting_entry',
  BIOMETRIC_SWITCH_ENTRY = 'biometric_switch_entry',

  SET_BIO = 'set_bio_entry',
  SCAN_QR_CODE = 'scan_qr_code_entry',
  SCAN_LOG_IN = 'scan_log_in_entry',
  VIEW_ON_WEBVIEW = 'view_on_webview',
}

export function isPortkeyEntries(variable: any): boolean {
  return Object.values(PortkeyEntries).includes(variable);
}

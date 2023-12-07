package io.aelf.core
const val PREFIX = "portkey_";
enum class PortkeyEntries {
    SIGN_IN_ENTRY,
    SCAN_QR_CODE_ENTRY,
    ACCOUNT_SETTING_ENTRY,
    GUARDIAN_HOME_ENTRY,
    ASSETS_HOME_ENTRY,
    PAYMENT_SECURITY_HOME_ENTRY;

    val entryName: String
        get() = PREFIX + name.lowercase()
}

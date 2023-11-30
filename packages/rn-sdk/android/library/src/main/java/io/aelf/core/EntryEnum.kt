package io.aelf.core

enum class PortkeyEntries {
    SIGN_IN_ENTRY, SCAN_QR_CODE_ENTRY, ACCOUNT_SETTING_ENTRY, GUARDIAN_HOME_ENTRY, ASSETS_HOME_ENTRY, UPDATE_CHECK_ENTRY;

    val entryName: String
        get() = name.lowercase()
}

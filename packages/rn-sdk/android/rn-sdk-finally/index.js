import 'reflect-metadata';
import { initEntries } from '@portkey/rn-sdk/src/global/init/entries';
import { initJsMethodService } from '@portkey/rn-sdk/src/global/init/services';
import { initLanguage } from '@portkey/rn-sdk/src/i18n';

// we use i18n to translate
initLanguage();

// init portkey's entry page with its entry name
initEntries();

// init js services for Android/iOS native
initJsMethodService();

// export for npm
export * from '@portkey/rn-sdk/src/service/core';
export { UnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';

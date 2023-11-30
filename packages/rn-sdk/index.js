import { initEntries } from 'global/init/entries';
import { initJsMethodService } from 'global/init/services';
import { initLanguage } from 'i18n/index';
// import { Platform } from 'react-native';
// import _updateConfig from './update.json';
// import {
//   checkUpdate,
//   downloadUpdate,
//   isFirstTime,
//   markSuccess,
//   isRolledBack,
//   switchVersion,
// } from 'react-native-update';

// we use i18n to translate
initLanguage();

// init portkey's entry page with its entry name
initEntries();

// init js services for Android/iOS native
initJsMethodService();

// if (isFirstTime) {
//   // 必须调用此更新成功标记方法
//   // 否则默认更新失败，下一次启动会自动回滚
//   markSuccess();
//   console.log('更新完成');
// } else if (isRolledBack) {
//   console.log('刚刚更新失败了,版本被回滚.');
// }
// const { appKey } = _updateConfig[Platform.OS];
// const info = await checkUpdate(appKey);
// if (info.update) {
//   const hash = await downloadUpdate(
//     info,
//     // 下载回调为可选参数，从v5.8.3版本开始加入
//     {
//       onDownloadProgress: ({ received, total }) => {
//         // 已下载的字节数, 总字节数
//         console.log(received, total);
//       },
//     },
//   );
//   if (hash) {
//     switchVersion(hash);
//   }
// }

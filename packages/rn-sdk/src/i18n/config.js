"use strict";
exports.__esModule = true;
exports.isValidLanguage = exports.getLocalLanguage = exports.DEFAULT_LANGUAGE = exports.LOCAL_LANGUAGE_LIST = exports.LOCAL_LANGUAGE = void 0;
var RNLocalize = require("react-native-localize");
exports.LOCAL_LANGUAGE = [
    { language: 'en', title: 'English' },
    { language: 'zh', title: '繁体中文' },
];
exports.LOCAL_LANGUAGE_LIST = exports.LOCAL_LANGUAGE.map(function (i) { return i.language; });
exports.DEFAULT_LANGUAGE = exports.LOCAL_LANGUAGE_LIST[0];
var getLocalLanguage = function () {
    var localLanguage = RNLocalize.getLocales()[0].languageCode;
    if (typeof localLanguage === 'string' && localLanguage.toLowerCase().includes('zh'))
        return 'zh';
    return 'en';
};
exports.getLocalLanguage = getLocalLanguage;
var isValidLanguage = function (language) {
    return exports.LOCAL_LANGUAGE_LIST.includes(language);
};
exports.isValidLanguage = isValidLanguage;

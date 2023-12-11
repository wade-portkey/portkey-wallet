import { createAction } from '@reduxjs/toolkit';
import { loginInfo } from '@portkey/rn-sdk/src/packages/store/store-ca/recent/type';

export const setLoginAccountAction = createAction<loginInfo>('login/setLoginAccount');

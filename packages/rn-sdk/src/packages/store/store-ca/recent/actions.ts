import { createAction } from '@reduxjs/toolkit';
import { loginInfo } from 'packages/store/store-ca/recent/type';

export const setLoginAccountAction = createAction<loginInfo>('login/setLoginAccount');

import crypto from 'crypto-js';
import * as expoCrypto from 'expo-crypto';

export const encrypt = (data: string, key: string): string => {
  return crypto.AES.encrypt(data, key).toString();
};

export const decrypt = (data: string, key: string): string => {
  return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
};

export const encryptLocal = async (data: string) => {
  return await expoCrypto.digestStringAsync(expoCrypto.CryptoDigestAlgorithm.SHA256, data);
};

import CryptoJS from "crypto-js";

export const encryptPayload = (payload, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secretKey
  ).toString();
  return ciphertext;
};

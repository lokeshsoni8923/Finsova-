// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const AES_KEY = CryptoJS.SHA256('FINSOVA-SECRET-KEY');
const HMAC_KEY = CryptoJS.SHA256('FINSOVA-HMAC-KEY');
const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Same as Buffer.alloc(16, 0)

/**
 * Encrypts the input text using AES-256-CBC with a static IV, and adds an HMAC.
 * Returns a string in the format: "cipherText::hmac"
 */
export function doubleEncryptAES(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, AES_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  const hmac = CryptoJS.HmacSHA256(encrypted, HMAC_KEY).toString();
  return `${encrypted}::${hmac}`;
}

/**
 * Verifies HMAC and decrypts the AES-256-CBC encrypted string.
 */
export function doubleDecryptAES(encryptedInput: string): string {

  const [encrypted, hmac] = encryptedInput.split('::');

  const expectedHmac = CryptoJS.HmacSHA256(encrypted, HMAC_KEY).toString();
  if (hmac !== expectedHmac) {
    throw new Error('HMAC verification failed');
  }

  const decrypted = CryptoJS.AES.decrypt(encrypted, AES_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}


import crypto from 'crypto'

const publicKey = `abcd@123`;

export function encryptCardNumber(cardNumber: string): string {
  debugger
  const buffer = Buffer.from(cardNumber, 'utf8');
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString('base64');
}
export function generateChecksum(payload: string, secretKey: string): string {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(payload);
  return hmac.digest('base64');
}

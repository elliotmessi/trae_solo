import * as CryptoJS from 'crypto-js'

const PWD_ENC_KEY = import.meta.env.VITE_PWD_ENC_KEY

export const AES = (keyword: string = PWD_ENC_KEY) => {
  const utf8 = CryptoJS.enc.Utf8
  const key = utf8.parse(keyword)
  const config = {
    iv: key,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  }
  const encrypt = (src: string) => {
    return CryptoJS.AES.encrypt(src, key, config).toString()
  }
  const decrypt = (src: string) => {
    return CryptoJS.AES.decrypt(src, key, config).toString(utf8)
  }
  return {
    encrypt,
    decrypt,
  }
}

/**
 * Base64 加密
 * @param {*} src  明文
 * @returns 密文
 */
export function base64Encrypt(src: string) {
  const encodedWord = CryptoJS.enc.Utf8.parse(src)
  return CryptoJS.enc.Base64.stringify(encodedWord)
}

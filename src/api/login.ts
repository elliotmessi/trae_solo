import http from '@/utils/http'
import { AES } from '@/utils/crypt'
import { getBasicAuth, loginNeedVerifyCode } from '@/utils/auth'
import { REGEXP_PHONE } from '@/utils/regexp'

/**
 * https://www.ietf.org/rfc/rfc6749.txt
 * OAuth 协议 4.3.1 要求格式为 form 而不是 JSON 注意！
 */
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'

/**
 * 登录
 * @param data
 */
export const login = (loginData: LoginRequest) => {
  const { password, ...params } = loginData
  const basicAuth = getBasicAuth()

  return http.post<LoginResponse>(
    '/auth/oauth2/token',
    {
      password: AES().encrypt(password),
    },
    {
      params: { ...params, ignoreVCode: !loginNeedVerifyCode },
      headers: { 'Content-Type': FORM_CONTENT_TYPE, Authorization: basicAuth },
      meta: { authRole: 'login' },
    },
  )
}

export const register = ({ password, username, code, companyName }: RegisterForm) => {
  const isPhone = REGEXP_PHONE.test(username)
  const extraParams = { [isPhone ? 'phone' : 'email']: username }
  return http.post(
    '/service/supplier/account',
    { password: AES().encrypt(password), username, code, companyName, ...extraParams },
    { meta: { authRole: null } },
  )
}

export const getVerifyCodeImage = (randomStr: string) => {
  const base = import.meta.env.VITE_API_URL
  return `${base}/code/image?randomStr=${randomStr}`
}

/** 获取注册验证码 */
export const getVerifyCode = (username?: string) => {
  return http.post('/service/supplier/account/send-code', { username }, { meta: { authRole: null } })
}

/** 获取邮箱验证码,找回密码/修改邮箱 */
export const getAccountVerifyCode = (account: string) => {
  return http.post('/account/mail/send-code', { account })
}

/** 绑定社交账号 */
// export const bindSoicalAccountAPI = (code: string, type: string) => http.post(`/account/bind/${type}?code=${code}`)

// 检测账号是否存在
export const accountExisted = (username: string) => http.post('/service/supplier/account/exist', { username }, { meta: { authRole: null } })

export const refreshToken = (refresh_token: string) => {
  const grant_type = 'refresh_token'
  const scope = 'server'
  // 获取当前选中的 basic 认证信息
  const basicAuth = getBasicAuth()

  return http.post<LoginResponse>('/auth/oauth2/token', null, {
    headers: {
      Authorization: basicAuth,
      'Content-Type': FORM_CONTENT_TYPE,
    },
    params: { refresh_token, grant_type, scope },
    meta: { authRole: 'refreshToken' },
  })
}

export const logout = () => http.delete('/auth/token/logout')

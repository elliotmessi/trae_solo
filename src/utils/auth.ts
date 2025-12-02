import { useUserStoreHook } from '@/store/modules/user'
import { isString, isIncludeAllChildren } from '@pureadmin/utils'
import { session, local, cookie } from '@/utils/storage'

export interface DataInfo {
  /** token */
  access_token: string
  refresh_token: string
  user_id: number
  username?: string
  avatar?: string
  nickname?: string
  roles?: Array<string>
  permissions?: Array<string>
}

export const userKey = 'user-info'
export const TokenKey = 'token'
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = 'multiple-tabs'

/** 获取`token` */
export function getToken(): string {
  return cookie.get(TokenKey) || local.get(TokenKey)
}

export function getRefreshToken(): string {
  return cookie.get('refresh_token') || local.get('refresh_token')
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`permissions`、`refreshToken`、`expires`这七条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: LoginResponse) {
  // let expires = 0
  const { access_token, refresh_token, user_id, username } = data
  const { isRemembered } = useUserStoreHook()

  const Storage = isRemembered ? local : cookie
  // Cookies.set(TokenKey, access_token)
  Storage.set(TokenKey, access_token)
  Storage.set('refresh_token', refresh_token)

  session.set(multipleTabsKey, 'true')

  function setUserKey({ user_id }) {
    // useUserStoreHook().SET_ID(user_id)
    local.set(userKey, {
      user_id,
    })
  }

  if (username) {
    setUserKey({
      user_id,
    })
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  cookie.remove(TokenKey)
  cookie.remove('refresh_token')
  local.remove(TokenKey)
  session.remove(multipleTabsKey)
  local.remove(userKey)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}

export const getBasicAuth = (): string => {
  const cache = session.get<string>('basicAuth')
  if (cache) {
    return cache
  }
  const clientSecret = window.btoa(import.meta.env.VITE_OAUTH2_PASSWORD_CLIENT)
  return 'Basic ' + clientSecret
}

export const loginNeedVerifyCode = import.meta.env.VITE_VERIFY_ENABLE === 'true'

/** 是否有按钮级别的权限（根据登录接口返回的`permissions`字段进行判断）*/
export const hasPerms = (value: string | Array<string>): boolean => {
  if (!value) return false
  const allPerms = '*:*:*'
  const { permissions } = useUserStoreHook()
  if (!permissions) return false
  if (permissions.length === 1 && permissions[0] === allPerms) return true
  const isAuths = isString(value) ? permissions.includes(value) : isIncludeAllChildren(value, permissions)
  return isAuths ? true : false
}

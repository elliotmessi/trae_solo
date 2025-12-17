import { defineStore } from 'pinia'
import { type userType, store, router, resetRouter, routerArrays, storageLocal } from '../utils'
import { useMultiTagsStoreHook } from './multiTags'
import { setToken, removeToken, userKey } from '@/utils/auth'
import { login, refreshToken } from '@/api/login'

export const useUserStore = defineStore('pure-user', {
  state: (): userType => ({
    id: storageLocal().getItem<UserInfo>(userKey)?.id ?? 0,
    // 头像
    avatar: storageLocal().getItem<UserInfo>(userKey)?.avatar ?? '',
    // 用户名
    username: storageLocal().getItem<UserInfo>(userKey)?.username ?? '',
    // 昵称
    nickname: storageLocal().getItem<UserInfo>(userKey)?.nickname ?? '',
    // 页面级别权限
    roles: storageLocal().getItem<UserInfo>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions: storageLocal().getItem<UserInfo>(userKey)?.permissions ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7,
  }),
  actions: {
    /** 存储ID */
    SET_ID(id: number) {
      this.id = id
    },
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value)
    },
    /** 登入 */
    async loginByUsername(data: LoginRequest) {
      return new Promise<LoginResponse>((resolve, reject) => {
        login(data)
          .then(data => {
            if (data) {
              // setToken(data)
              this.setUserInfo(data.userInfo)
            }
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setUserInfo(userInfo: UserInfo) {
      this.SET_ID(userInfo.id)
      this.SET_AVATAR(userInfo.avatar ?? '')
      this.SET_USERNAME(userInfo.username)
      this.SET_NICKNAME(userInfo.nickname ?? '')
      this.SET_ROLES(userInfo.roles)
      this.SET_PERMS(userInfo.permissions)
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = ''
      this.roles = []
      this.permissions = []
      removeToken()
      useMultiTagsStoreHook().handleTags('equal', [...routerArrays])
      resetRouter()
      router.push('/login')
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<LoginResponse>((resolve, reject) => {
        refreshToken(data)
          .then(data => {
            if (data) {
              setToken(data)
              this.setUserInfo(data.userInfo)
              resolve(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}

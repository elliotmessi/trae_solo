/// <reference types='alova/client' />

// 公共类型定义

// 请求响应公共类型定义
type Code = 0 | 1
type Response<T> = {
  code: Code
  data: T
  message: string
}
type Result<T> = T

type PageResult<T> = Result<{
  total: number
  size?: number
  current?: number
  pages?: number
  records: T[]
}>
type PageQuery<T extends Record<string, any> = Record<string, any>> = T & {
  current?: number
  size?: number
}

type AuditStatus = 'pending' | 'approved' | 'rejected' | 'draft'

// 国家
type Country = {
  id: string
  countryName: string
  englishName: string
  code: string
  initial: string // 首字母
  alpha3?: string
  currency?: string // 货币
  symbol?: string // 货币符号
  exchangeRate?: number // 汇率
  phoneCode?: string // 国家电话代码
  portInfoList?: {
    // 港口列表
    id: string
    countryId: string
    portType: string
    portName: string
  }[]
}

// 词典
type DictItem = {
  dictType: string
  label: string
  sortOrder: number
  value: string
}

type LoginRequest = {
  username: string // 必填: 用户名或手机号
  password: string // 必填: 密码
  grant_type?: string
  scope?: string
  randomStr?: string // 随机字符串（登录时看配置）
  code?: string // 图形验证码（登录时看配置）
}

type LoginResponse = {
  access_token: string
  refresh_token: string
  user_id: number
  username?: string
}

type RegisterRequest = {
  username: string
  password: string
  repeatPassword: string
  code: string
  email?: string
  phone?: string
  companyName?: string
}
type RegisterForm = RegisterRequest & {
  repeatPassword: string
  termsAgree: boolean
}

type UserId = number

type UserInfo = {
  userId: UserId
  username: string
  name?: string
  nickname?: string
  phone?: string
  email?: string
  avatar?: string
  // wxOpenId?: string
  addressCity?: string
  addressCountry?: string
  addressPostalCode?: string
  addressProvince?: string
  addressStreet?: string
  companyId?: string
  gender?: string
  wechatBound?: boolean
}

// 用户信息更新请求类型
type UpdateUserInfoRequest = {
  nickname?: string
  username?: string
}

// 密码修改请求类型
type ChangePasswordRequest = {
  oldPassword: string
  password: string
}

// 邮箱修改请求类型
type ChangeEmailRequest = {
  code: string
  newAccount: string
}

// 手机号修改请求类型
type ChangePhoneRequest = {
  code: string
  phone: string
}

// 用户列表请求类型
type UserListRequest = PageQuery<{
  keyword?: string
  status?: number
  role?: string
  department?: string
}>

// 用户列表响应类型
type UserListResponse = PageQuery<{
  users: UserInfo[]
  total: number
}>

// 用户详情响应类型
type UserDetailResponse = UserInfo & {
  /** 公司信息 */
  company?: Company
  /** 角色列表 */
  roleList?: Array<{
    id: number
    name: string
    code: string
  }>
  /** 权限列表 */
  permissionList?: Array<{
    id: number
    name: string
    code: string
    type: number
  }>
}

// 用户统计信息类型
type UserStats = {
  totalUsers: number
  activeUsers: number
  newUsers: number
  onlineUsers: number
}

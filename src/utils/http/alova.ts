import { createAlova } from 'alova'
import Axios from 'axios'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import VueHook from 'alova/vue'
import { createServerTokenAuthentication } from 'alova/client'
import { stringify } from 'qs'
import { formatToken, getRefreshToken, getToken, setToken } from '@/utils/auth'
import { refreshToken } from '@/api/login'

const AxiosInstance = Axios.create({
  paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' }),
})

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<typeof VueHook, typeof axiosRequestAdapter>({
  refreshTokenOnError: {
    // 当服务端token过期
    isExpired(response) {
      return response.status === 424
    },
    // 当token过期时触发，在此函数中触发刷新token
    async handler() {
      try {
        const token = getRefreshToken()
        const data = await refreshToken(token)
        setToken(data)
      } catch (error) {
        // token刷新失败
        location.href = '/login'
        throw error
      }
    },
  },
  login(response) {
    setToken(response.data as LoginResponse)
  },
  assignToken: method => {
    const token = getToken()
    method.meta?.authRole !== 'refreshToken' && (method.config.headers.Authorization = formatToken(token))
  },
})

const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 50000,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter({
    axios: AxiosInstance,
  }),
  /** request 拦截器 */
  beforeRequest: onAuthRequired(method => {
    const { config, data, meta } = method
    console.log('method:', config, data, meta)
  }),
  responded: onResponseRefreshToken({
    onSuccess: async (response, method) => {
      console.log('response:', response)
      if (method.meta?.blob) {
        return response.data
      }

      // 处理code
      if (response.data.code === 1) {
        throw response.data
      }

      return response.data?.data ? response.data.data : response.data
    },
    onError: (error, method) => {
      // error.status 服务端返回的状态码
      console.log('error.status:', error.status)
      if (error.status === 401) {
        // 处理401错误，调用带token的接口则跳转到登录页
        method.meta?.authRole === null && (location.href = '/login')
      }
      // error.status 服务端返回的状态码
      if ([403, 404, 500].includes(error.status)) {
        // 处理403, 404, 500错误，跳转到错误页
        // location.href = `/error/${error.status}`
      }

      throw error.response?.data || error
    },
  }),
})

export default alovaInstance

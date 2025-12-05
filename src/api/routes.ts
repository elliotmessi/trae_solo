import http from '@/utils/http'

type Result = any[]

export const getAsyncRoutes = () => {
  return http.get<Result>('/get-async-routes')
}

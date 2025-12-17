// 根据角色动态生成路由
import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { success } from './utils'

export default defineFakeRoute([
  {
    url: '/api/auth/oauth2/token',
    method: 'post',
    response: () =>
      success({
        access_token: 'fake-token',
        refresh_token: 'fake-refresh-token',
        userInfo: {
          id: '1',
          username: 'admin',
          nickname: 'admin',
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          roles: ['admin', 'common'],
          permissions: ['permission:btn:add', 'permission:btn:edit', 'permission:btn:delete'],
        },
        expires: 7 * 24 * 60 * 60 * 1000,
      }),
  },
])

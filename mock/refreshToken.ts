import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { success } from './utils'

// 模拟刷新token接口
export default defineFakeRoute([
  {
    url: '/api/auth/oauth2/token',
    method: 'post',
    response: () => {
      return success({
        token: 'fake-token-refreshed',
        userInfo: {
          id: '1',
          username: 'admin',
          nickName: 'admin',
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          roles: ['admin', 'common'],
          auths: ['permission:btn:add', 'permission:btn:edit', 'permission:btn:delete'],
        },
        expires: 7 * 24 * 60 * 60 * 1000,
      })
    },
  },
])

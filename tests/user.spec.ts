import { test, expect } from '@playwright/test'

// 用户管理测试用例
test.describe('User Management Tests', () => {
  // 模拟登录过程
  async function login(page: any) {
    await page.goto('/login')
    await page.fill('input[type="text"]', 'admin@example.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button[type="submit"]')
    // 等待登录成功并跳转到首页
    await page.waitForURL('/')
  }

  test.beforeEach(async ({ page }) => {
    // 在每个测试前登录
    await login(page)
  })

  // 测试用户信息页面
  test('should display user profile page', async ({ page }) => {
    // 导航到用户信息页面（这里的路由需要根据实际项目调整）
    await page.goto('/user/profile')

    // 验证页面标题
    await expect(page.locator('h1')).toContainText('个人信息')

    // 验证用户信息表单元素存在
    await expect(page.locator('input[placeholder="用户名"]')).toBeVisible()
    await expect(page.locator('input[placeholder="邮箱"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // 测试修改密码功能
  test('should allow changing password', async ({ page }) => {
    // 导航到修改密码页面（这里的路由需要根据实际项目调整）
    await page.goto('/user/change-password')

    // 验证页面元素存在
    await expect(page.locator('input[placeholder="当前密码"]')).toBeVisible()
    await expect(page.locator('input[placeholder="新密码"]')).toBeVisible()
    await expect(page.locator('input[placeholder="确认新密码"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // 测试用户头像上传功能
  test('should allow uploading avatar', async ({ page }) => {
    // 导航到用户信息页面
    await page.goto('/user/profile')

    // 检查头像上传元素是否存在
    const avatarUpload = page.locator('input[type="file"]')
    await expect(avatarUpload).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

// 业务管理测试用例
test.describe('Business Management Tests', () => {
  // 模拟登录过程
  async function login(page: any) {
    await page.goto('/login')
    await page.fill('input[type="text"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button[type="submit"]')
    // 等待登录成功并跳转到首页
    await page.waitForURL('/')
  }

  test.beforeEach(async ({ page }) => {
    // 在每个测试前登录
    await login(page)
  })

  // 测试业务列表页面
  test('should display business list page', async ({ page }) => {
    // 导航到业务列表页面
    await page.goto('/business/list')

    // 验证页面标题
    await expect(page.locator('h1')).toContainText('业务列表')

    // 验证主要功能按钮存在
    await expect(page.locator('text=创建业务')).toBeVisible()
    await expect(page.locator('text=查询')).toBeVisible()
  })

  // 测试创建业务页面
  test('should display create business page', async ({ page }) => {
    // 导航到创建业务页面
    await page.goto('/business/create')

    // 验证页面标题
    await expect(page.locator('h1')).toContainText('创建业务')

    // 验证表单元素存在
    await expect(page.locator('input[placeholder="业务名称"]')).toBeVisible()
    await expect(page.locator('textarea[placeholder="业务描述"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // 测试业务管理导航
  test('should navigate through business management menu', async ({ page }) => {
    // 点击业务管理菜单
    await page.click('text=业务管理')

    // 验证子菜单项存在
    await expect(page.locator('text=业务列表')).toBeVisible()
    await expect(page.locator('text=创建业务')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

// 登录测试用例
test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 在每个测试前导航到登录页面
    await page.goto('/login')
  })

  // 测试登录页面的基本元素
  test('should display login page with all elements', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/登录/)

    // 验证登录表单元素存在
    await expect(page.locator('input[type="text"]')).toBeVisible() // 用户名输入框
    await expect(page.locator('input[type="password"]')).toBeVisible() // 密码输入框
    await expect(page.locator('button[type="submit"]')).toBeVisible() // 登录按钮
  })

  // 测试登录失败的情况
  test('should show error message for invalid login', async ({ page }) => {
    // 输入无效的登录凭据
    await page.fill('input[type="text"]', 'invalid@example.com')
    await page.fill('input[type="password"]', 'invalidpassword')

    // 提交表单
    await page.click('button[type="submit"]')

    // 验证错误消息显示
    // 注意：这里需要根据实际的错误消息选择器进行调整
    await expect(page.locator('.el-message--error')).toBeVisible()
  })

  // 测试登录页面的其他功能（如切换登录方式）
  test('should allow switching between login methods', async ({ page }) => {
    // 检查手机登录选项是否存在
    const phoneLoginOption = page.locator('text=手机登录')
    await expect(phoneLoginOption).toBeVisible()

    // 切换到手机登录
    await phoneLoginOption.click()

    // 验证手机登录表单元素存在
    await expect(page.locator('input[type="tel"]')).toBeVisible()
  })
})

// 注册功能测试
test.describe('Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 导航到注册页面
    await page.goto('/reg')
  })

  test('should display registration page with all elements', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/注册/)

    // 验证注册表单元素存在
    await expect(page.locator('input[type="text"]')).toBeVisible() // 用户名/手机号
    await expect(page.locator('input[type="password"]')).toBeVisible() // 密码
    await expect(page.locator('input[placeholder="确认密码"]')).toBeVisible() // 确认密码
    await expect(page.locator('button[type="submit"]')).toBeVisible() // 注册按钮
  })
})

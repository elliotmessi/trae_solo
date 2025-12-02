import type { Page } from '@playwright/test'

/**
 * 通用测试辅助函数
 */
export class TestHelper {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * 执行登录操作
   * @param username 用户名
   * @param password 密码
   */
  async login(username: string = 'test@example.com', password: string = 'password') {
    await this.page.goto('/login')

    // 等待登录页面加载完成
    await this.page.waitForSelector('input[type="text"]', { visible: true })

    // 填写登录表单
    await this.page.fill('input[type="text"]', username)
    await this.page.fill('input[type="password"]', password)

    // 提交表单
    await this.page.click('button[type="submit"]')

    // 等待登录成功并跳转到首页
    await this.page.waitForURL('/', { timeout: 10000 })

    // 验证是否成功登录（通过检查用户菜单是否存在）
    await this.page.waitForSelector('.user-menu', { timeout: 5000 })
  }

  /**
   * 执行登出操作
   */
  async logout() {
    // 点击用户菜单
    await this.page.click('.user-menu')

    // 点击登出按钮
    await this.page.click('text=退出登录')

    // 等待登出成功并跳转到登录页面
    await this.page.waitForURL('/login')
  }

  /**
   * 导航到指定的菜单项
   * @param menuName 主菜单项名称
   * @param subMenuName 子菜单项名称（可选）
   */
  async navigateToMenu(menuName: string, subMenuName?: string) {
    // 点击主菜单项
    await this.page.click(`.sidebar-menu :text("${menuName}")`)

    // 如果有子菜单项，则点击子菜单项
    if (subMenuName) {
      await this.page.click(`.sidebar-menu :text("${subMenuName}")`)
    }
  }

  /**
   * 等待加载指示器消失
   */
  async waitForLoading() {
    try {
      // 等待加载指示器消失
      await this.page.waitForSelector('.loading-indicator', { state: 'detached', timeout: 5000 })
    } catch (error) {
      // 如果加载指示器不存在，忽略错误
      console.log('No loading indicator found', error)
    }
  }

  /**
   * 填写表单并提交
   * @param formSelector 表单选择器
   * @param fields 字段及其值的对象
   */
  async fillAndSubmitForm(formSelector: string, fields: { [key: string]: string }) {
    // 填写表单字段
    for (const [field, value] of Object.entries(fields)) {
      await this.page.fill(`${formSelector} [name="${field}"]`, value)
    }

    // 提交表单
    await this.page.click(`${formSelector} button[type="submit"]`)

    // 等待表单提交完成
    await this.waitForLoading()
  }
}

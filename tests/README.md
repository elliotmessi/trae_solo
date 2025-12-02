# SolutionMall B2B 供应商平台 - 自动化测试文档

## 测试框架

本项目使用 [Playwright](https://playwright.dev/) 进行自动化测试。Playwright 是一个强大的端到端测试工具，支持多种浏览器和平台。

## 测试结构

测试文件位于 `tests/` 目录下，主要包括：

- `login.spec.ts` - 登录相关测试
- `business.spec.ts` - 业务管理相关测试
- `user.spec.ts` - 用户管理相关测试
- `test-helper.ts` - 测试辅助函数

## 安装和配置

### 1. 安装 Playwright

```bash
# 安装 Playwright 依赖
pnpm add -D playwright

# 安装浏览器
npx playwright install
```

### 2. 配置 Playwright

Playwright 配置文件位于项目根目录 `playwright.config.ts`，主要配置项包括：

- `testDir` - 测试文件目录
- `fullyParallel` - 是否并行运行测试
- `retries` - 失败测试的重试次数
- `reporter` - 测试报告格式
- `use.baseURL` - 测试的基础URL
- `projects` - 测试的浏览器配置

## 运行测试

### 运行所有测试

```bash
# 使用 npx 运行所有测试
npx playwright test

# 或使用 npm 脚本
npm run test:e2e
```

### 运行特定测试文件

```bash
npx playwright test login.spec.ts
```

### 运行测试并生成HTML报告

```bash
npx playwright test --reporter=html

# 查看报告
npx playwright show-report
```

## 扩展测试套件

### 添加新的测试文件

1. 在 `tests/` 目录下创建新的测试文件，遵循 `*.spec.ts` 命名约定
2. 使用 Playwright 的测试API编写测试用例

### 示例测试代码

```typescript
import { test, expect } from '@playwright/test'
import { TestHelper } from './test-helper'

test.describe('Example Tests', () => {
  let helper: TestHelper

  test.beforeEach(async ({ page }) => {
    helper = new TestHelper(page)
    await helper.login() // 使用辅助函数登录
  })

  test('should do something', async ({ page }) => {
    // 导航到页面
    await page.goto('/some-page')

    // 验证元素
    await expect(page.locator('h1')).toContainText('Page Title')

    // 执行操作
    await page.click('button')

    // 验证结果
    await expect(page.locator('.success-message')).toBeVisible()
  })
})
```

## 测试最佳实践

1. **使用测试辅助函数** - 利用 `test-helper.ts` 中的函数简化测试代码
2. **分组测试** - 使用 `test.describe()` 将相关测试分组
3. **设置前置条件** - 使用 `test.beforeEach()` 设置测试前置条件
4. **使用断言** - 使用 `expect()` 验证测试结果
5. **等待元素** - 使用 `waitForSelector()` 等方法等待元素加载完成
6. **处理异步操作** - 确保异步操作正确处理，使用 `async/await`

## 调试测试

### 使用 Playwright Inspector

```bash
npx playwright test --debug
```

### 生成测试追踪

测试失败时，Playwright 会自动生成测试追踪，可以通过 HTML 报告查看详细的测试执行过程。

## 注意事项

1. 确保测试环境配置正确，特别是 `baseURL`
2. 对于需要登录的测试，使用 `TestHelper.login()` 辅助函数
3. 测试执行前确保应用服务器正在运行，或者配置 Playwright 自动启动服务器
4. 定期更新测试，确保与应用功能保持同步

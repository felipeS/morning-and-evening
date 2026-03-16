import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should navigate to current client-date reading', async ({ page }) => {
    await page.addInitScript(() => {
      const fixedDate = new Date('2022-03-16T20:00:00')
      const OriginalDate = Date

      const MockDate = function (this: Date, ...args: unknown[]) {
        if (args.length === 0) {
          return new OriginalDate(fixedDate)
        }

        return new OriginalDate(args[0] as string)
      }

      MockDate.now = () => fixedDate.getTime()
      MockDate.parse = OriginalDate.parse
      MockDate.UTC = OriginalDate.UTC
      MockDate.prototype = OriginalDate.prototype

      // @ts-ignore overriding Date for deterministic client-time behavior in e2e
      window.Date = MockDate
    })

    await page.goto('/')

    await expect(page).toHaveURL(/\/posts\/16-03-PM$/)
    await expect(page.locator('[data-current-day="true"]')).toBeVisible()
    await expect(page.locator('[data-current-session="true"]')).toBeVisible()
  })
})

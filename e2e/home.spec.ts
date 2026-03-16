import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should navigate to the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Daily Reader - Devotional/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('a[href^="/posts/"]').first()).toBeVisible()
  })
})

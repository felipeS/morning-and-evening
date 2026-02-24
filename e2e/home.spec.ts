import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should navigate to the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Mañana y Noche/)
    // Verify at least one post link is visible
    const postLinks = page.locator('h3 a')
    await expect(postLinks.first()).toBeVisible()
  })
})

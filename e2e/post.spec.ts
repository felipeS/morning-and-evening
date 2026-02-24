import { test, expect } from '@playwright/test'

test.describe('Post Page', () => {
  test('should navigate to a post page', async ({ page }) => {
    await page.goto('/')

    // Find the first post link
    const postLink = page.locator('h3 a').first()
    const postTitle = await postLink.innerText()

    // Click and wait for navigation
    await postLink.click()

    // Take a screenshot of the post page
    await page.screenshot({ path: 'screenshots/post-page.png', fullPage: true })

    // Check if the title is correct
    // Note: postTitle might contain extra whitespace or newlines, so we trim or use loose match if needed.
    // The h1 might be formatted slightly differently, but the text should be there.
    const h1 = page.locator('h1').last() // Try last h1 if there are multiple
    await expect(h1).toContainText(postTitle)
  })
})

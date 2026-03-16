import { test, expect } from '@playwright/test'

test.describe('Post Page', () => {
  test('should navigate to a post page', async ({ page }) => {
    await page.goto('/')
    const initialHeading = (await page.getByRole('heading', { level: 1 }).innerText()).trim()
    const currentPath = new URL(page.url()).pathname
    const postLinks = page.locator('a[href^="/posts/"]')
    const postCount = await postLinks.count()

    let targetHref = ''

    for (let index = 0; index < postCount; index += 1) {
      const link = postLinks.nth(index)
      const href = await link.getAttribute('href')

      if (href && href !== currentPath) {
        targetHref = href
        await link.click()
        break
      }
    }

    expect(targetHref).not.toBe('')
    await expect(page).toHaveURL(new RegExp(`${targetHref}$`))

    // Take a screenshot of the post page
    await page.screenshot({ path: 'screenshots/post-page.png', fullPage: true })

    await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(initialHeading)
  })
})

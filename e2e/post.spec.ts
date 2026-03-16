import { test, expect } from '@playwright/test'

test.describe('Post Page', () => {
  test('should navigate to a post page', async ({ page }) => {
    await page.goto('/')
    const initialHeading = (await page.getByRole('heading', { level: 1 }).innerText()).trim()
    const currentPath = new URL(page.url()).pathname
    const companionLink = page.getByRole('link', { name: 'Leer esta lectura →' })
    const targetHref = await companionLink.getAttribute('href')

    expect(targetHref).not.toBe('')
    expect(targetHref).not.toBe(currentPath)

    await companionLink.click()
    await expect(page).toHaveURL(new RegExp(`${targetHref}$`))
    await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(initialHeading)
  })
})

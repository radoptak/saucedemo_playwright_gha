import { test, expect } from '@playwright/test';

test('main page loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const username = process.env.SAUCE_USERNAME!;
    const password = process.env.SAUCE_PASSWORD!;

    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(page).toHaveURL(/inventory.html/);

    const inventoryHeader = page.locator('.title');
    await expect(inventoryHeader).toBeVisible();
    await expect(inventoryHeader).toHaveText('Products');
  });
});
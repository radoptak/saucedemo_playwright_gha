import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Technical assertion: Check if URL changed
    await expect(page).toHaveURL(/inventory.html/);
    
    // User-facing assertion: Check if the Products header is visible
    // We use a locator that points to the main heading of the inventory page
    const inventoryHeader = page.locator('.title');
    await expect(inventoryHeader).toBeVisible();
    await expect(inventoryHeader).toHaveText('Products');
  });
});
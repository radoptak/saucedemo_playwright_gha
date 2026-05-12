import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';


test.describe('Smoke Tests - Basic E2E Flow', () => {
  
  test('should login and interact with inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    await expect(inventoryPage.headerTitle).toBeVisible();
    await expect(inventoryPage.headerTitle).toHaveText(UI_TEXTS.INVENTORY_HEADER);
    
    const inventoryCount = await inventoryPage.getInventoryCount();
    expect(inventoryCount).toBeGreaterThan(0);

    const initialCartCount = await inventoryPage.getCartBadgeCount();
    expect(initialCartCount).toBe(0);

    await inventoryPage.addItemToCartById(PRODUCTS.BACKPACK);

    const finalCartCount = await inventoryPage.getCartBadgeCount();
    expect(finalCartCount).toBe(1);
  });
});
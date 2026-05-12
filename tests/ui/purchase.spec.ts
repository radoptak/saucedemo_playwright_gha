import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';
import { CUSTOMER_DATA } from '../../test-data/user-data';


test.describe('Purchase Flow', () => {
  
  test('should complete a purchase from login to thank you page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const infoPage = new CheckoutInfoPage(page);
    const overviewPage = new CheckoutOverviewPage(page);
    const completePage = new CheckoutCompletePage(page);

    await test.step('Login to the application', async () => {
      await loginPage.goto();
      await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
      await expect(inventoryPage.headerTitle).toBeVisible();
      await expect(inventoryPage.headerTitle).toHaveText(UI_TEXTS.INVENTORY_HEADER);
    });

    await test.step('Verify environment readiness', async () => {
      expect(await inventoryPage.getInventoryCount(), 'No products found!').toBeGreaterThan(0);
      expect(await inventoryPage.getCartBadgeCount(), 'Cart not empty!').toBe(0);
    });

    await test.step('Add product and navigate to cart', async () => {
      await inventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);

      await inventoryPage.goToCart();
      await expect(cartPage.headerTitle).toBeVisible();
      await expect(cartPage.headerTitle).toHaveText(UI_TEXTS.CART_HEADER);
      await expect(cartPage.getProductRemoveButton(PRODUCTS.BACKPACK.ID)).toBeVisible();
    });

    await test.step('Fill checkout information', async () => {
      await cartPage.clickCheckout();
      await infoPage.fillInformation(
        CUSTOMER_DATA.FIRST_NAME,
        CUSTOMER_DATA.LAST_NAME,
        CUSTOMER_DATA.POSTAL_CODE );
    });

    await test.step('Review order and finish', async () => {
      const expectedProductName = PRODUCTS.BACKPACK.NAME;
      
      await expect(page.getByTestId('inventory-item-name')).toHaveText(expectedProductName);
      await overviewPage.clickFinish();
    });


  });
});
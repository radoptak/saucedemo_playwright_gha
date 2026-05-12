import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';
import { EMPTY_CUSTOMER } from '../../test-data/user-data';

test.describe('Checkout Validation', () => {

  test('should block checkout if user information is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const infoPage = new CheckoutInfoPage(page);

    await test.step('Login and prepare cart', async () => {
      await loginPage.goto();
      await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
      await inventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
    });

    await test.step('Navigate to checkout', async () => {
      await inventoryPage.goToCart();
      await cartPage.clickCheckout();
    });

    await test.step('Submit empty form', async () => {
      await infoPage.fillInformation(
        EMPTY_CUSTOMER.FIRST_NAME, 
        EMPTY_CUSTOMER.LAST_NAME, 
        EMPTY_CUSTOMER.POSTAL_CODE
      );
    });

    await test.step('Verify validation error', async () => {
      await expect(infoPage.errorMessage).toBeVisible();
      await expect(infoPage.errorMessage).toContainText(UI_TEXTS.CHECKOUT_ERROR_FIRST_NAME);
    });
  });

});
import { test, expect } from '../../fixtures';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';
import { CUSTOMER_DATA } from '../../test-data/user-data';

test.describe('Purchase Flow', () => {
  test('should complete a purchase for a logged-in standard user', async ({
    loggedInInventoryPage,
    cartPage,
    infoPage,
    overviewPage,
    completePage,
  }) => {
    await test.step('Verify environment readiness', async () => {
      await expect(loggedInInventoryPage.headerTitle).toHaveText(UI_TEXTS.INVENTORY_HEADER);
      expect(await loggedInInventoryPage.getInventoryCount(), 'No products found!').toBeGreaterThan(0);
      expect(await loggedInInventoryPage.getCartBadgeCount(), 'Cart not empty!').toBe(0);
    });

    await test.step('Add product and navigate to cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(1);

      await loggedInInventoryPage.goToCart();
      await expect(cartPage.headerTitle).toBeVisible();
      await expect(cartPage.headerTitle).toHaveText(UI_TEXTS.CART_HEADER);
      await expect(cartPage.getProductRemoveButton(PRODUCTS.BACKPACK.ID)).toBeVisible();
    });

    await test.step('Submit checkout information', async () => {
      await cartPage.clickCheckout();
      await infoPage.submitInformation(
        CUSTOMER_DATA.FIRST_NAME,
        CUSTOMER_DATA.LAST_NAME,
        CUSTOMER_DATA.POSTAL_CODE,
      );
    });

    await test.step('Review order and finish', async () => {
      const expectedProductName = PRODUCTS.BACKPACK.NAME;

      await expect(overviewPage.itemName).toHaveText(expectedProductName);
      await overviewPage.clickFinish();
    });

    await test.step('Verify successful purchase complete', async () => {
      await expect(completePage.completeHeader).toBeVisible();
      await expect(completePage.completeHeader).toHaveText(UI_TEXTS.CHECKOUT_COMPLETE_HEADER);

      await expect(completePage.backHomeButton).toBeVisible();
    });
  });
});

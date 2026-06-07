import { test, expect } from '../../fixtures';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';
import { EMPTY_CUSTOMER } from '../../test-data/user-data';

test.describe('Checkout Validation', () => {
  test('should block checkout if user information is empty', async ({
    loggedInInventoryPage,
    cartPage,
    infoPage,
  }) => {
    await test.step('Prepare cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
    });

    await test.step('Navigate to checkout', async () => {
      await loggedInInventoryPage.goToCart();
      await cartPage.clickCheckout();
    });

    await test.step('Submit empty form', async () => {
      await infoPage.fillInformation(
        EMPTY_CUSTOMER.FIRST_NAME,
        EMPTY_CUSTOMER.LAST_NAME,
        EMPTY_CUSTOMER.POSTAL_CODE,
      );
    });

    await test.step('Verify validation error', async () => {
      await expect(infoPage.errorMessage).toBeVisible();
      await expect(infoPage.errorMessage).toContainText(UI_TEXTS.CHECKOUT_ERROR_FIRST_NAME);
    });
  });
});

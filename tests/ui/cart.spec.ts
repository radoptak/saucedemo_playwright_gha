import { test, expect } from '../../fixtures';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';

test.describe('Cart Flow', () => {
  test('should remove product from cart', async ({ loggedInInventoryPage, cartPage }) => {
    await test.step('Add product to cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(1);
    });

    await test.step('Navigate to cart', async () => {
      await loggedInInventoryPage.goToCart();
      await expect(cartPage.headerTitle).toHaveText(UI_TEXTS.CART_HEADER);
      await expect(cartPage.getProductRemoveButton(PRODUCTS.BACKPACK.ID)).toBeVisible();
    });

    await test.step('Remove product from cart', async () => {
      await cartPage.removeProductById(PRODUCTS.BACKPACK.ID);
    });

    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
    });
  });
});

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

  test('should display multiple products in cart', async ({ loggedInInventoryPage, cartPage }) => {
    await test.step('Add multiple products to cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BIKE_LIGHT.ID);

      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(2);
    });

    await test.step('Navigate to cart', async () => {
      await loggedInInventoryPage.goToCart();
      await expect(cartPage.headerTitle).toHaveText(UI_TEXTS.CART_HEADER);
    });

    await test.step('Verify selected products are visible in cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(2);
      await expect(cartPage.getProductName(PRODUCTS.BACKPACK.NAME)).toBeVisible();
      await expect(cartPage.getProductName(PRODUCTS.BIKE_LIGHT.NAME)).toBeVisible();
    });
  });
});

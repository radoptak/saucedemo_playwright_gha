import { test, expect } from '../../fixtures';
import { PRODUCTS } from '../../test-data/products';

test.describe('Reset App State', () => {
  test('should reset cart state for a logged-in standard user', async ({
    loggedInInventoryPage,
  }) => {
    await test.step('Add product to cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(1);
    });

    await test.step('Reset app state', async () => {
      await loggedInInventoryPage.resetAppState();
    });

    await test.step('Verify cart state is reset', async () => {
      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(0);
    });
  });
});

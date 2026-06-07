import { test, expect } from '../../fixtures';

test.describe('Inventory Sorting', () => {
  test('should sort products by name from A to Z', async ({ loggedInInventoryPage }) => {
    await test.step('Sort products by name ascending', async () => {
      await loggedInInventoryPage.sortProductsBy('az');
    });

    await test.step('Verify products are sorted alphabetically', async () => {
      const productNames = await loggedInInventoryPage.getProductNames();
      const sortedProductNames = [...productNames].sort();

      expect(productNames).toEqual(sortedProductNames);
    });
  });
});

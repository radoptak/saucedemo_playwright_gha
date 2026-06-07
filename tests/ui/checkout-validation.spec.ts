import { test, expect } from '../../fixtures';
import { PRODUCTS } from '../../test-data/products';
import { UI_TEXTS } from '../../test-data/ui-texts';
import {
  CUSTOMER_WITHOUT_FIRST_NAME,
  CUSTOMER_WITHOUT_LAST_NAME,
  CUSTOMER_WITHOUT_POSTAL_CODE,
  EMPTY_CUSTOMER,
} from '../../test-data/user-data';

type CheckoutCustomer = {
  FIRST_NAME: string;
  LAST_NAME: string;
  POSTAL_CODE: string;
};

test.describe('Checkout Validation', () => {
  test('should block checkout if user information is empty', async ({
    loggedInInventoryPage,
    cartPage,
    infoPage,
  }) => {
    await test.step('Prepare cart', async () => {
      await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
      expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(1);
    });

    await test.step('Navigate to checkout', async () => {
      await loggedInInventoryPage.goToCart();
      await cartPage.clickCheckout();
    });

    await test.step('Submit empty form', async () => {
      await infoPage.submitInformation(
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

  const partialValidationCases: {
    name: string;
    customer: CheckoutCustomer;
    expectedError: string;
  }[] = [
    {
      name: 'should block checkout if first name is missing',
      customer: CUSTOMER_WITHOUT_FIRST_NAME,
      expectedError: UI_TEXTS.CHECKOUT_ERROR_FIRST_NAME,
    },
    {
      name: 'should block checkout if last name is missing',
      customer: CUSTOMER_WITHOUT_LAST_NAME,
      expectedError: UI_TEXTS.CHECKOUT_ERROR_LAST_NAME,
    },
    {
      name: 'should block checkout if postal code is missing',
      customer: CUSTOMER_WITHOUT_POSTAL_CODE,
      expectedError: UI_TEXTS.CHECKOUT_ERROR_POSTAL_CODE,
    },
  ];

  for (const { name, customer, expectedError } of partialValidationCases) {
    test(name, async ({ loggedInInventoryPage, cartPage, infoPage }) => {
      await test.step('Prepare cart', async () => {
        await loggedInInventoryPage.addItemToCartById(PRODUCTS.BACKPACK.ID);
        expect(await loggedInInventoryPage.getCartBadgeCount()).toBe(1);
      });

      await test.step('Navigate to checkout', async () => {
        await loggedInInventoryPage.goToCart();
        await cartPage.clickCheckout();
      });

      await test.step('Submit incomplete checkout information', async () => {
        await infoPage.submitInformation(
          customer.FIRST_NAME,
          customer.LAST_NAME,
          customer.POSTAL_CODE,
        );
      });

      await test.step('Verify validation error', async () => {
        await expect(infoPage.errorMessage).toBeVisible();
        await expect(infoPage.errorMessage).toContainText(expectedError);
      });
    });
  }
});

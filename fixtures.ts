import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutInfoPage } from './pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  infoPage: CheckoutInfoPage;
  overviewPage: CheckoutOverviewPage;
  completePage: CheckoutCompletePage;

  loggedInInventoryPage: InventoryPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  infoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  overviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  completePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  loggedInInventoryPage: async ({ loginPage, inventoryPage }, use) => {
    await baseTest.step('Setup: Automatic user login', async () => {
      await loginPage.goto();
      await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
      await expect(inventoryPage.headerTitle).toBeVisible();
    });

    await use(inventoryPage);
  },
});

export { expect };

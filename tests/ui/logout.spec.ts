import { test, expect } from '../../fixtures';

test.describe('Logout Flow', () => {
  test('should log out a logged-in standard user', async ({ loggedInInventoryPage, loginPage }) => {
    await test.step('Log out from inventory page', async () => {
      await loggedInInventoryPage.logout();
    });

    await test.step('Verify user is redirected to login page', async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});

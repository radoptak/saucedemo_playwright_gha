import { test, expect } from '../../fixtures';
import { INVALID_CREDENTIALS, LOCKED_OUT_USER } from '../../test-data/user-data';
import { UI_TEXTS } from '../../test-data/ui-texts';

test.describe('Login Negative Paths', () => {
  test('should display error for invalid credentials', async ({ loginPage }) => {
    await test.step('Attempt login with invalid data', async () => {
      await loginPage.goto();
      await loginPage.login(INVALID_CREDENTIALS.USERNAME, INVALID_CREDENTIALS.PASSWORD);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(UI_TEXTS.LOGIN_ERROR_INVALID_CREDS);
    });
  });

  test('should display error for locked out user', async ({ loginPage }) => {
    await test.step('Attempt login with locked out user', async () => {
      await loginPage.goto();
      await loginPage.login(LOCKED_OUT_USER.USERNAME, LOCKED_OUT_USER.PASSWORD);
    });

    await test.step('Verify locked out error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(UI_TEXTS.LOGIN_ERROR_LOCKED_OUT);
    });
  });
});

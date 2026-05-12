import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { INVALID_CREDENTIALS } from '../../test-data/user-data';
import { UI_TEXTS } from '../../test-data/ui-texts';

test.describe('Login Negative Paths', () => {

  test('should display error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Attempt login with invalid data', async () => {
      await loginPage.goto();
      await loginPage.login(INVALID_CREDENTIALS.USERNAME, INVALID_CREDENTIALS.PASSWORD);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(UI_TEXTS.LOGIN_ERROR_INVALID_CREDS);
    });
  });

});
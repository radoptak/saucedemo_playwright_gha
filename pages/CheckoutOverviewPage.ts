import { type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  private readonly page: Page;
  readonly finishButton: Locator;
  readonly itemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByTestId('finish');
    this.itemName = page.getByTestId('inventory-item-name');
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }
}
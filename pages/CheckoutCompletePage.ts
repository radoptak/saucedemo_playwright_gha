import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
  }
}
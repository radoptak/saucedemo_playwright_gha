import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  readonly headerTitle: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item'); 
  }

  getProductRemoveButton(productSlug: string): Locator {
    return this.page.getByTestId(`remove-${productSlug}`);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  readonly headerTitle: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async getInventoryCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addItemToCartById(productSlug: string): Promise<void> {
    const addToCartButton = this.page.getByTestId(`add-to-cart-${productSlug}`);
    await addToCartButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return parseInt(text || '0', 10);
    }

    return 0;
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}

import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly headerTitle: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async isDisplayed() {
    await expect(this.headerTitle).toBeVisible();
    await expect(this.headerTitle).toHaveText('Products');
  }

  async getInventoryCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCartByIndex(index: number = 0) {
    const product = this.inventoryItems.nth(index);
    await product.locator('button').click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }
}
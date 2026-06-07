import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  readonly headerTitle: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppStateLink: Locator;
  private readonly inventoryItems: Locator;
  private readonly inventoryItemNames: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly sortDropdown: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.getByTestId('title');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.inventoryItemNames = page.getByTestId('inventory-item-name');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async getInventoryCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async sortProductsBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.inventoryItemNames.allTextContents();
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

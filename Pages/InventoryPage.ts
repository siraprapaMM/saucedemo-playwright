import {type Page, type Locator } from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly sortDropdown: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.inventoryItems = page.getByTestId('inventory-item');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.itemPrices = page.getByTestId('inventory-item-price');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    async sortBy(option: string){
        await this.sortDropdown.selectOption(option);
    }

    async getItemNames(){
        return await this.itemNames.allTextContents();
    }
    
    async getItemPrices(){
        const prices = await this.itemPrices.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}
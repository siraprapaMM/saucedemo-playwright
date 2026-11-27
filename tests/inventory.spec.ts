import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';

test.describe('Inventory', () =>{
    let inventoryPage: InventoryPage;

    test.beforeEach(async({ page }) =>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        inventoryPage = new InventoryPage(page);
    });

    test('shows 6 products', async() =>{
        await expect(inventoryPage.pageTitle).toHaveText('Products');
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('sorts products by name from Z to A', async () =>{
        await inventoryPage.sortBy('za');
        const names = await inventoryPage.getItemNames();
        const expected = [...names].sort().reverse();
        expect(names).toEqual(expected);
    });

    test('sorts products by name from A to Z', async () =>{
        await inventoryPage.sortBy('za');
        await inventoryPage.sortBy('az');
        const names = await inventoryPage.getItemNames();
        const expected = [...names].sort();
        expect(names).toEqual(expected);
    });

    test('sorts products by price from low to high', async () =>{
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getItemPrices();
        const expected = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(expected);
    });

    test('sorts products by price from high to low', async () =>{
        await inventoryPage.sortBy('hilo');
        const prices = await inventoryPage.getItemPrices();
        const expected = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(expected);
    });
});
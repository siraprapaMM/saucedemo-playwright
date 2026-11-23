import {test, expect} from '@playwright/test';

test.describe('Login',()=>{
    test.beforeEach(async({page}) =>{
        await page.goto('https://www.saucedemo.com/');
    });

    test('logs in successfully with valid credentials', async({page}) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();   
        await expect(page).toHaveURL(/inventory/);
    });

    test('shows error when password is wrong', async({page}) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('wrong_pass');
        await page.locator('#login-button').click();   
        
        const errorMessage=page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');
    });
});
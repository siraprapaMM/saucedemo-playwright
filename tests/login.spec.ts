import {test, expect} from '@playwright/test';

test('login สำเร็จ', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await page.locator("#user-name").fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
});

test('login ไม่สำเร็จเมื่อใส่รหัสผ่านปิด', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await page.locator("#user-name").fill('standard_user');
    await page.locator('#password').fill('worng_passwprd');
    await page.locator('#login-button').click();

    const erroeMessage = page.locator('[data-test="error"]');
    await expect(erroeMessage).toBeVisible();
    await expect(erroeMessage).toContainText('Username and password do not match');
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('logs in successfully with valid credentials', async ({ page }) => {
        loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('shows error when password is wrong', async ({ page }) => {
        loginPage.login('standard_user', 'wrong_password');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('shows error when account is locked out', async ({ page }) => {
        loginPage.login('locked_out_user','secret_sauce');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
    });

    test('shows error when username is empty', async ({ page }) => {
        loginPage.login('','secret_sauce');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });

});
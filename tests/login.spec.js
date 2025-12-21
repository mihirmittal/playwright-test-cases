const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
});
test('TC-01: Verify successful login with valid credentials', async ({ page }) => {
  // Test data
  const validEmail = 'test@example.com';
  const validPassword = 'Test123!';
  // Enter credentials
  await page.getByLabel('Email:').fill(validEmail);
  await page.getByLabel('Password:').fill(validPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
  
  // Verify successful login
  await expect(page.getByRole('link', { name: 'My account' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});
test('TC-02: Verify login with invalid password', async ({ page }) => {
  const validEmail = 'test@example.com';
  const invalidPassword = 'wrongpassword';
  await page.getByLabel('Email:').fill(validEmail);
  await page.getByLabel('Password:').fill(invalidPassword);
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.getByText('Login was unsuccessful. Please correct the errors and try again.')).toBeVisible();
});
test('TC-03: Verify login with unregistered email', async ({ page }) => {
  const invalidEmail = 'nonexistent@example.com';
  const password = 'Password123!';
  await page.getByLabel('Email:').fill(invalidEmail);
  await page.getByLabel('Password:').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.getByText('No customer account found')).toBeVisible();
});
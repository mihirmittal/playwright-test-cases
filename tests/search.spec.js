// tests/search.spec.js
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');
});

test('TC-10: Verify search using Category filter', async ({ page }) => {
  // Search for "galaxy"
  await page.getByPlaceholder('Search store').fill('galaxy');
  await page.getByRole('button', { name: 'Search' }).click();
  
  // Enable advanced search
  await page.getByLabel('Advanced search').check();
  
  // Select Category - Computers
  await page.getByLabel('Category:').selectOption('6'); // Computers
  
  // Click search
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  
  // Verify no products found
  await expect(page.getByText('No products were found that matched your criteria.')).toBeVisible();
});

test('TC-11: Verify search using Manufacturer filter', async ({ page }) => {
  // Search for "phone"
  await page.getByPlaceholder('Search store').fill('phone');
  await page.getByRole('button', { name: 'Search' }).click();
  
  // Enable advanced search
  await page.getByLabel('Advanced search').click();
  
  // Select Manufacturer - Apple
  await page.getByLabel('Manufacturer:').selectOption('2'); // Apple
  
  // Click search
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  
  // Verify results
  const productCount = await page.locator('.product-item').count();
  expect(productCount).toBeGreaterThan(0);
});
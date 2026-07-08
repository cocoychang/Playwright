const { expect } = require('@playwright/test');

async function login(page, baseUrl, email, password) {
    await page.goto(`${baseUrl}/login`);
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    // Accept either 'Browse Events' or 'Browse Events →' by matching text
    await expect(page.getByRole('link', { name: /Browse Events/ })).toBeVisible();
}

async function loginAndGoToBooking(page, baseUrl, email, password) {
    await login(page, baseUrl, email, password);
    // navigate to events (bookings entry)
    await page.goto(`${baseUrl}/events`);
}

module.exports = { login, loginAndGoToBooking };

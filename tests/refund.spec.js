const { test, expect } = require('@playwright/test');
const { loginAndGoToBooking } = require('../utils/loginHelper');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const TEST_EMAIL = process.env.TEST_EMAIL || 'tester@example.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Password123!';

test.describe('Refund eligibility checks', () => {
    test('Single ticket booking is eligible for refund', async ({ page }) => {
        await loginAndGoToBooking(page, BASE_URL, TEST_EMAIL, TEST_PASSWORD);

        // Step 2 - Book first event (first card)
        const firstCard = page.locator('[data-testid="event-card"]').first();
        await expect(firstCard).toBeVisible();
        await firstCard.locator('[data-testid="book-now-btn"]').click();

        // Fill booking form (defaults to 1 ticket)
        await page.getByLabel('Full Name').fill('Refund Tester');
        await page.locator('#customer-email').fill(TEST_EMAIL);
        await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
        await page.locator('.confirm-booking-btn').click();

        // Step 3 - Navigate to booking detail
        await page.getByRole('link', { name: 'View My Bookings' }).click();
        await expect(page).toHaveURL(`${BASE_URL}/bookings`);
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await expect(page.getByText('Booking Information')).toBeVisible();

        // Step 4 - Validate booking ref
        const bookingRef = (await page.locator('.booking-ref').first().innerText()).trim();
        const eventTitle = (await page.locator('h1').first().innerText()).trim();
        expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

        // Step 5 - Check refund eligibility (spinner appears and disappears)
        await page.getByRole('button', { name: 'Check Refund Eligibility' }).click();
        const spinner = page.locator('#refund-spinner');
        await expect(spinner).toBeVisible();
        await expect(spinner).toBeHidden({ timeout: 6000 });

        // Step 6 - Validate result
        const result = page.locator('#refund-result');
        await expect(result).toBeVisible();
        await expect(result).toContainText('Eligible for refund');
        await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
    });

    test('Group booking (3 tickets) is not eligible for refund', async ({ page }) => {
        await loginAndGoToBooking(page, BASE_URL, TEST_EMAIL, TEST_PASSWORD);

        // Book first event
        const firstCard = page.locator('[data-testid="event-card"]').first();
        await expect(firstCard).toBeVisible();
        await firstCard.locator('[data-testid="book-now-btn"]').click();

        // Increase quantity to 3
        const incButton = page.locator('button:has-text("+")');
        await incButton.click();
        await incButton.click();

        // Fill booking details
        await page.getByLabel('Full Name').fill('Group Tester');
        await page.locator('#customer-email').fill(TEST_EMAIL);
        await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
        await page.locator('.confirm-booking-btn').click();

        // Navigate to booking detail
        await page.getByRole('link', { name: 'View My Bookings' }).click();
        await expect(page).toHaveURL(`${BASE_URL}/bookings`);
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await expect(page.getByText('Booking Information')).toBeVisible();

        // Validate booking ref vs title
        const bookingRef = (await page.locator('.booking-ref').first().innerText()).trim();
        const eventTitle = (await page.locator('h1').first().innerText()).trim();
        expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

        // Check refund eligibility
        await page.getByRole('button', { name: 'Check Refund Eligibility' }).click();
        const spinner = page.locator('#refund-spinner');
        await expect(spinner).toBeVisible();
        await expect(spinner).toBeHidden({ timeout: 6000 });

        const result = page.locator('#refund-result');
        await expect(result).toBeVisible();
        await expect(result).toContainText('Not eligible for refund');
        await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
    });
});

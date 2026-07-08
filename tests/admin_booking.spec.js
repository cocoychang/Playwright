const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const { login } = require('../utils/loginHelper');
const { futureDateValue } = require('../utils/dateUtils');

// Configuration
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
// Provide admin credentials via env or replace below with working admin account
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Password123!';

test('Admin creates event, user books one ticket, seats decrement by 1', async ({ page }) => {
    const po = new POManager(page);

    // Step 1 - Login
    await login(page, BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD);

    // Step 2 - Create a new event
    const eventAdmin = po.getEventAdminPage();
    const eventTitle = `Test Event ${Date.now()}`;
    const eventData = {
        title: eventTitle,
        description: 'Automated test event description',
        city: 'Mumbai',
        venue: 'Test Hall',
        dateTime: futureDateValue(10),
        price: 100,
        totalSeats: 50
    };
    await eventAdmin.navigate(BASE_URL);
    await eventAdmin.createEvent(eventData);

    // Step 3 - Find the event card and capture seats
    const eventsPage = po.getEventsPage();
    await eventsPage.navigate(BASE_URL);
    await expect(eventsPage.cards.first()).toBeVisible();
    const matchedCard = await eventsPage.findCardByTitle(eventTitle);
    const seatsBeforeBooking = await eventsPage.seatsFromCard(matchedCard);
    expect(typeof seatsBeforeBooking).toBe('number');

    // Step 4 - Start booking
    await matchedCard.locator('[data-testid="book-now-btn"]').click();

    // Step 5 - Fill booking form
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel('Full Name').fill('Automation Tester');
    await page.locator('#customer-email').fill('tester+' + Date.now() + '@example.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
    await page.locator('.confirm-booking-btn').click();

    // Step 6 - Verify booking confirmation
    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();
    const bookingRef = (await bookingRefEl.innerText()).trim();

    // Step 7 - Verify in My Bookings
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();
    const matchedBooking = bookingCards.filter({ hasText: bookingRef });
    await expect(matchedBooking.first()).toBeVisible();
    await expect(matchedBooking.first()).toContainText(eventTitle);

    // Step 8 - Verify seat reduction
    await eventsPage.navigate(BASE_URL);
    await expect(eventsPage.cards.first()).toBeVisible();
    const matchedCardAfter = await eventsPage.findCardByTitle(eventTitle);
    const seatsAfterBooking = await eventsPage.seatsFromCard(matchedCardAfter);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});

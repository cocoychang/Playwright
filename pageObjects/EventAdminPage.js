const { expect } = require('@playwright/test');

class EventAdminPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('#event-title-input');
        this.description = page.locator('#admin-event-form textarea');
        this.city = page.getByLabel('City');
        this.venue = page.getByLabel('Venue');
        this.eventDateTime = page.getByLabel('Event Date & Time');
        this.price = page.getByLabel('Price ($)');
        this.totalSeats = page.getByLabel('Total Seats');
        this.submitBtn = page.locator('#add-event-btn');
    }

    async navigate(baseUrl) {
        await this.page.goto(`${baseUrl}/admin/events`);
    }

    async createEvent({title, description, city, venue, dateTime, price, totalSeats}) {
        await this.title.fill(title);
        await this.description.fill(description);
        await this.city.fill(city);
        await this.venue.fill(venue);
        await this.eventDateTime.fill(dateTime);
        await this.price.fill(String(price));
        await this.totalSeats.fill(String(totalSeats));
        await this.submitBtn.click();
        await expect(this.page.getByText('Event created!')).toBeVisible();
    }
}

module.exports = {EventAdminPage};

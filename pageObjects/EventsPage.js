const { expect } = require('@playwright/test');

class EventsPage {
    constructor(page) {
        this.page = page;
        this.cards = page.locator('[data-testid="event-card"]');
    }

    async navigate(baseUrl) {
        await this.page.goto(`${baseUrl}/events`);
    }

    async findCardByTitle(title) {
        const matched = this.cards.filter({ hasText: title });
        await expect(matched.first()).toBeVisible({ timeout: 5000 });
        return matched.first();
    }

    async seatsFromCard(cardLocator) {
        const text = await cardLocator.innerText();
        // find first integer in text near the word 'seat' or 'seats'
        const m = text.match(/(\d+)\s*(?=seat|seats)/i) || text.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : null;
    }
}

module.exports = {EventsPage};

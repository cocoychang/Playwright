const {test, expect} = require('@playwright/test');

// test('constant Playwright test', async ({browser}) => {
//     //playwright code goes here
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://opensource-demo.orangehrmlive.com/');
//     console.log('Hello World');
//     console.log(await page.title());
//     expect(await page.title()).toBe('OrangeHRM');
//     const userName = await page.locator('//input[@name="username"]');
//     await userName.fill('Admin');
//     const password = await page.locator('//input[@name="password"]');
//     await password.fill('admin123');
//     const loginButton = await page.locator("//button[@type='submit']");
//     await loginButton.click();
//     const dashboardHeader = await page.locator('//h6[normalize-space()="Dashboard"]');
//     await expect(dashboardHeader).toBeVisible();
// });


test('page Playwright test', async ({page}) => {
    //playwright code goes here
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    const employeeName = await page.locator('//div[@class="oxd-table"]/child::div[@class="oxd-table-body"]/child::div[@class="oxd-table-card"]//child::div[2]/div[text()]');
    const userName = await page.locator('//input[@name="username"]');
    const password = await page.locator('//input[@name="password"]');
    const loginButton = await page.locator("//button[@type='submit']");
    const dashboardHeader = await page.locator('//h6[normalize-space()="Dashboard"]');
    const adminMenu = await page.locator("//span[text()='Admin']");
    console.log('Hello World');
    console.log(await page.title());
    expect(await page.title()).toBe('OrangeHRM');
    expect(await page.title()).toBe('OrangeHRM');
    await userName.fill('Admin');
    await password.fill('admin123');
    await loginButton.click();
    await expect(dashboardHeader).toBeVisible();
    await adminMenu.click();
    console.log(await employeeName.nth(0).textContent());
    console.log(await employeeName.nth(1).textContent());
    console.log(await employeeName.nth(2).textContent());
    const employeeAllNames = await employeeName.allTextContents();
    console.log(employeeAllNames);
});
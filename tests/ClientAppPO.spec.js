const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));




test(`@Web End to end testing for ${dataSet.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    //const productName = dataSet.productName;
    const cardNumber = dataSet.cardNumber;
    const userName = dataSet.username;
    const password = dataSet.password;


  

  //logic methods and actions
   const loginPage = poManager.getLoginPage();
     await loginPage.navigateToLoginPage();
     await loginPage.validLogin(userName,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(dataSet.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


test("Special Element",async({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  const testLabel = page.getByLabel("Check me out if you Love IceCreams!");
  const employedLabel = page.getByLabel("Employed");
  const genderDropdown = page.getByLabel("Gender");
  const password = page.getByPlaceholder("Password");
  const buttons = page.getByRole("button", {name: "Submit"});
  const shoppingLink = page.getByRole("link", {name: "Shop"});
  const successMessage = page.getByText("Success! The Form has been submitted successfully!.")
  const appCard = page.locator("app-card");

  await password.type("rahulshettyacademy");
  await testLabel.click();
  await expect(testLabel).toBeChecked();
  await employedLabel.check();
  await expect(employedLabel).toBeChecked();
  await genderDropdown.selectOption("Male");
  await buttons.click();
  await expect(successMessage).toBeVisible();
  await shoppingLink.click();
  await appCard.filter({hasText: "Nokia edge"}).locator("button").click();
  

});  
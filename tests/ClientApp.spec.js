const { test, expect } = require('@playwright/test');



test('Login page', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator(".radiotextsty");
    const alertOkayButton = page.locator("#okayBtn");
    const termsAndConditionLink = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropdown.selectOption("Teacher");
    await radioButton.last().click();
    await alertOkayButton.click();
    console.log(await radioButton.last().isChecked());
    await expect(radioButton.last()).toBeChecked();
    await termsAndConditionLink.click();
    await expect(termsAndConditionLink).toBeChecked();
    await termsAndConditionLink.uncheck();
    await expect(termsAndConditionLink).not.toBeChecked();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    // await signInButton.click();
});

test('child windows handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    await newPage.waitForLoadState();
    const text = await newPage.locator(".red");
    const arrayOfText = (await text.textContent()).split("@");
    const email = arrayOfText[1].split(" ")[0];
    console.log(await text.textContent());
    console.log(email);
    await userName.fill(email);
    console.log(await userName.inputValue());
});





test('End to end testing', async ({ page }) => {
    const productName = "ADIDAS ORIGINAL";
    const cardNumber = "4111 1111 1111 1111";
    let orderIDValue ="";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginButton = page.locator("[value='Login']");
  const allProducts = page.locator(".card-body b");
  const productAddToCartButton = page.locator("//*[@class='card-body']/child::button[normalize-space()='Add To Cart']");
  const cartButton = page.locator("[routerlink*='cart']");
  const cartProducts = page.locator(".cartSection h3");
  const continueShoppingButton = page.locator('//button[text()="Continue Shopping"]');
  const checkoutButton = page.locator('//button[contains(text(),"Checkout")]');
  const creditCardNumber = page.locator("//div[text()='Credit Card Number ']/following-sibling::input");
  const expryDateMonth = page.locator('(//select[@class="input ddl"])[1]');
  const expryDateDay = page.locator('(//select[@class="input ddl"])[2]');
  const cvv = page.locator("//div[contains(text(),'CVV Code')]/following-sibling::input");
  const nameOnCard = page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input");
  const applyCoupon = page.locator("//div[contains(text(),'Apply Coupon')]/following-sibling::input");
  const applyCouponButton = page.locator("//button[contains(text(),'Apply Coupon')]");
  const countryDropdown = page.locator("//input[@placeholder='Select Country']");
  const placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");
  const orderConfirmationMessage = page.locator(".hero-primary");
  const transactionID = page.locator("label[class='ng-star-inserted']");
  const orderHistoryButton = page.locator("label[routerlink='/dashboard/myorders']");
  const countryDropdownOptions = page.locator(".ta-item");
  let orderHistoryID = page.locator('th[scope="row"]').filter({hasText: orderIDValue});
  const orderIDViewPage = page.locator("//small[@class='col-title']/following-sibling::div");
  const orderProductName = page.locator("//div[@class='artwork-card-info']/child::div[@class='title']");


  //logic methods and actions
  await userName.fill("tagurosubukanmoko@gmail.com");
  await password.fill("Admin@01");
  await loginButton.click();
  await allProducts.first().waitFor();
  console.log(await allProducts.nth(0).textContent());
  console.log(await allProducts.nth(1).textContent());
  console.log(await allProducts.nth(2).textContent());
  console.log(await allProducts.allTextContents());
  const count = await productAddToCartButton.count();
  for(let i=0; i<count; i++){
    if(await allProducts.nth(i).textContent() === productName){
      await productAddToCartButton.nth(i).click();
      break;
    }
  }
  await cartButton.click();
  await expect(cartProducts).toHaveText(productName);
  await continueShoppingButton.first().waitFor();
  const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
  await expect(bool).toBeTruthy();
  console.log(bool);
  await checkoutButton.click();
  await creditCardNumber.fill(cardNumber);
  await expryDateMonth.selectOption("05");
  await expryDateDay.selectOption("15");
  await cvv.fill("123");
  await nameOnCard.fill("John Doe");
  await applyCoupon.fill("rahulshettyacademy");
  await applyCouponButton.click();
  await countryDropdown.pressSequentially("phi")
  if(await countryDropdown.inputValue() === ""){
    await countryDropdown.type("phi");
  }
  await countryDropdownOptions.first().waitFor();
  await countryDropdownOptions.click();
  await placeOrderButton.click();
  await orderConfirmationMessage.waitFor();
  expect(orderConfirmationMessage).toHaveText(" Thankyou for the order. ");
  await transactionID.waitFor();
  const orderID = await transactionID.textContent();
  orderIDValue = orderID.split("|")[1].trim();
  console.log(orderIDValue);
  
  await orderHistoryButton.click();
  await orderHistoryID.first().waitFor();
  await expect(orderHistoryID.first()).toHaveText(orderIDValue);
  await expect(orderHistoryID.first()).toBeVisible();
  const row = await page.locator("tbody tr");
  for (let i=0; i< await row.count(); i++){
    if(await row.nth(i).locator("th").textContent() === orderIDValue){
      await row.nth(i).locator("button").first().click();
      break;
    }   
  }
  await orderIDViewPage.waitFor();
  await expect(orderIDViewPage).toHaveText(orderIDValue);
  await expect(orderProductName).toHaveText(productName);
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
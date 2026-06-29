
 import {test, expect} from '@playwright/test';
 import {customTest} from '../utils_ts/test-base';

import {POManager} from '../pageobjects_ts/POManager';

 //Json->string->js object
 const dataset =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

 

 test(`@Webs Client App login for ${dataset.productName}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(dataset.username,dataset.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(dataset.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId:any;
     orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();






    
 });


customTest(`Client App login`, async ({page,testDataForOrder})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();


})
//test files will trigger parallel
//individual tests in the file will run in sequence
 

 



 


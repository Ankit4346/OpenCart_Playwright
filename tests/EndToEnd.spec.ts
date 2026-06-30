/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import {test,expect,Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { LoginPage } from '../pages/LoginPage';
import {MyAccountPage} from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import {SearchResultsPage} from "../pages/SearchResultsPage";
import {ProductPage} from '../pages/ProductPage';
import {ShoppingCartPage} from '../pages/ShoppingCartPage';

// This is the main test block that runs the entire flow
test('execute end-to-end test flow @end-to-end', async ({ page }) => {
    const config = new TestConfig();
    // Navigate to the application's home page
    await page.goto(config.appUrl);

    // Step 1: Register a new account and capture the generated email
    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Step 2: Logout after successful registration
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Step 3: Login with the registered email
    await performLogin(page, registeredEmail);
    console.log("✅ Login is completed!");

    // Step 4: Search for a product and add it to the cart
    await addProductToCart(page);
    console.log("✅ Product added to cart!");

    // Step 5: Verify the contents of the shopping cart
    await verifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed!");


});

//  1) Register a new account

async function performRegistration(page: Page): Promise<string> {

  const homePage = new HomePage(page);
  await homePage.clickMyAccount();  
  await homePage.clickRegister();

  const registrationPage=new RegistrationPage(page);
   await registrationPage.setFirstName(RandomDataUtil.getFirstName());
   await registrationPage.setLastName(RandomDataUtil.getLastName());
   const email=RandomDataUtil.getEmail();
   await registrationPage.setEmail(email);
   await registrationPage.setPassword('test123');
   await registrationPage.setConfirmPassword('test123');
   await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
   await registrationPage.setPrivacyPolicy();
   await registrationPage.clickContinue();

   const confirmationMsg=await registrationPage.getConfirmationMsg();
   expect(confirmationMsg).toContain('Your Account Has Been Created!');

   return email;
}

//  2) Logout after registration
async function performLogout(page: Page) {

const myAccountPage=new MyAccountPage(page);
const logoutPage:LogoutPage=await myAccountPage.clickLogout();

expect (await logoutPage.isContinueButtonVisible()).toBeTruthy();
const homePage = await logoutPage.clickContinue();
expect(await homePage.isHomePageExists()).toBe(true);
}

//  3) Login with the same account

async function performLogin(page: Page, email: string) {

  const config = new TestConfig();
  await page.goto(config.appUrl);  // Reload home page

  const homePage=new HomePage(page);
  const loginPage=new LoginPage(page);

  await homePage.clickMyAccount();
  await homePage.clickLogin();

  await loginPage.setEmail(email);
  await loginPage.setPassword('test123');
  await loginPage.clickLogin();

  const myAccountPage = new MyAccountPage(page);
  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

//  4) Search for a product and add it to the shopping cart

async function addProductToCart(page: Page) {

   const homePage = new HomePage(page);

    const config = new TestConfig();
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();  // Click on search button

    const searchResultsPage = new SearchResultsPage(page);

    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Validate that the desired product exists in the results
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    // Select product and set quantity
    const productPage = await searchResultsPage.selectProduct(productName);
    await productPage?.setQuantity(productQuantity);
    await productPage?.addToCart();  // Add product to shopping cart

    await page.waitForTimeout(3000); // Wait to simulate user delay

    // Confirm product was added
    expect(await productPage?.isConfirmationMessageVisible()).toBe(true);  

}

//  5) Verify cart contents

async function verifyShoppingCart(page: Page) {

const productPage = new ProductPage(page);

    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigateToCart();
    const shoppingCartPage: ShoppingCartPage = await productPage.clickViewCart();

    console.log("🛒 Navigated to shopping cart!");

    const config = new TestConfig();
    
    // Validate that total price is correct (based on config)
    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);

}


//  6) Attempt checkout (disabled since feature isn't available on demo site)

async function performCheckout(page: Page) {

}




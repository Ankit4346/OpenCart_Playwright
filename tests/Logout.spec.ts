/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import {test,expect} from '@playwright/test';

let testConfig:TestConfig;
let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;
let logoutPage:LogoutPage;

test.beforeEach('Launch URL',async ({page})=>{

testConfig=new TestConfig();

await page.goto(testConfig.appUrl);

homePage=new HomePage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);
logoutPage=new LogoutPage(page);

})

test ('User logout test @master @regression',async()=>{

await homePage.clickMyAccount();
await homePage.clickLogin();

await loginPage.setEmail(testConfig.email);
await loginPage.setPassword(testConfig.password);
await loginPage.clickLogin();

const status=await myAccountPage.isMyAccountPageExists();
expect(status).toBeTruthy();

await myAccountPage.clickLogout();

const contBtn=await logoutPage.isContinueButtonVisible();
expect(contBtn).toBeTruthy();

await logoutPage.clickContinue();

expect(await homePage.isHomePageExists()).toBeTruthy();

})


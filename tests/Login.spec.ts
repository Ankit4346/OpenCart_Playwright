/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import {test,expect,Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import {MyAccountPage} from '../pages/MyAccountPage';


let homePage:HomePage;
let loginPage:LoginPage;
let config:TestConfig;
let myAccountPage:MyAccountPage;

test.beforeEach('Launch URL',async ({page})=>{

config=new TestConfig();

await page.goto(config.appUrl);

homePage=new HomePage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);

});

test.afterEach('Clean up',async({page})=>{

await page.waitForTimeout(3000);
await page.close();
});

test('Login ',async()=>{

  await homePage.clickMyAccount();
await homePage.clickLogin();
await loginPage.setEmail(config.email);
await loginPage.setPassword(config.password);
await loginPage.clickLogin();

const isLoggedIn=await myAccountPage.isMyAccountPageExists();
expect(isLoggedIn).toBeTruthy();
console.log('Account Logged in Successfully');

});

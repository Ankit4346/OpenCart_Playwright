/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import {test,expect,Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';


let homePage:HomePage;
let registerPage:RegistrationPage;
let url:TestConfig;

test.beforeEach('Launch URL',async ({page})=>{

url=new TestConfig();

await page.goto(url.appUrl);

homePage=new HomePage(page);
registerPage=new RegistrationPage(page);

});

test.afterEach('Clean up',async({page})=>{

await page.waitForTimeout(3000);
await page.close();
});


test ('Account Registration',{tag:['@master', '@sanity', '@regression']},async ()=>{

homePage.clickMyAccount();
homePage.clickRegister();

await registerPage.setFirstName(RandomDataUtil.getFirstName());
await registerPage.setLastName(RandomDataUtil.getLastName());
await registerPage.setEmail(RandomDataUtil.getEmail());
await registerPage.setTelephone(RandomDataUtil.getPhoneNumber());
const pass=RandomDataUtil.getPassword();
await registerPage.setPassword(pass);
await registerPage.setConfirmPassword(pass);
await registerPage.setPrivacyPolicy();
await registerPage.clickContinue();

expect(await registerPage.getConfirmationMsg()).toBe('Your Account Has Been Created!');

});



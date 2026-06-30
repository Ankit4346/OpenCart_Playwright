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
import {MyAccountPage} from '../pages/MyAccountPage';
import {DataProvider} from '../utils/dataProvider';


let homePage:HomePage;
let loginPage:LoginPage;
let config:TestConfig;
let myAccountPage:MyAccountPage;

const jsonPath='data/logindata.json';
let jsonData:any=DataProvider.getTestDataFromJson(jsonPath);

const csvPath='data/logindata.csv';
let csvData:any=DataProvider.getTestDataFromCsv(csvPath);

// ============================== JSON Data DRiven =====================================
for (let data of jsonData){

  test(`Login using JSON Data : ${data.testName} @datadriven`,async ({page})=>{

config=new TestConfig();

await page.goto(config.appUrl);

homePage=new HomePage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);

await homePage.clickMyAccount();
await homePage.clickLogin();
await loginPage.setEmail(data.email);
await loginPage.setPassword(data.password);
await loginPage.clickLogin();

if (data.expected.toLowerCase()==='success'){

  const isLoggedIn=await myAccountPage.isMyAccountPageExists();
  expect(isLoggedIn).toBeTruthy();
  console.log('Account Logged in Successfully');
}

else{

const errorMsg=await loginPage.getloginErrorMessage();
expect(errorMsg).toContain('');
  console.log('Account NOT logged ');
}

  });

};


// ============================== CSV Data Driven =====================================
for (let data of csvData){

  test(`Login using CSV Data : ${data.testName} @datadriven`,async ({page})=>{

config=new TestConfig();

await page.goto(config.appUrl);

homePage=new HomePage(page);
loginPage=new LoginPage(page);
myAccountPage=new MyAccountPage(page);

await homePage.clickMyAccount();
await homePage.clickLogin();
await loginPage.setEmail(data.email);
await loginPage.setPassword(data.password);
await loginPage.clickLogin();

if (data.expected.toLowerCase()==='success'){

  const isLoggedIn=await myAccountPage.isMyAccountPageExists();
  expect(isLoggedIn).toBeTruthy();
  console.log('Account Logged in Successfully');
}

else{

const errorMsg=await loginPage.getloginErrorMessage();
expect(errorMsg).toContain('Warning: No match');
  console.log('Account NOT logged ');
}

  });

};

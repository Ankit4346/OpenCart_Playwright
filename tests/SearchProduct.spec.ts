/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */

import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import {SearchResultsPage} from "../pages/SearchResultsPage";
import {test,expect,Locator} from "@playwright/test";

let testConfig:TestConfig;
let homePage:HomePage;
let searchResultPage:SearchResultsPage;

test.beforeEach('Launching url',async({page})=>{

testConfig=new TestConfig();

await page.goto(testConfig.appUrl);

homePage=new HomePage(page);
searchResultPage=new SearchResultsPage(page);

});

test ('Product search test @master @regression',async ()=>{

await homePage.enterProductName(testConfig.productName);
await homePage.clickSearch();

const status=await searchResultPage.isSearchResultsPageExists();
expect(status).toBeTruthy();

console.log('Searched Product count',await searchResultPage.getProductCount());

const statusProduct=await searchResultPage.isProductExist(testConfig.productName);
expect(statusProduct).toBeTruthy();

});











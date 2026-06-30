/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import {SearchResultsPage} from "../pages/SearchResultsPage";
import {test,expect,Locator} from "@playwright/test";
import {ProductPage} from '../pages/ProductPage';


let testConfig:TestConfig;
let homePage:HomePage;
let searchResultPage:SearchResultsPage;
let productPage:ProductPage;

test.beforeEach('Launching url',async({page})=>{

testConfig=new TestConfig();

await page.goto(testConfig.appUrl);

homePage=new HomePage(page);
searchResultPage=new SearchResultsPage(page);
productPage=new ProductPage(page);

});

test ('Add product to cart test @master @regression',async ()=>{

await homePage.enterProductName(testConfig.productName);
await homePage.clickSearch();

const status=await searchResultPage.isSearchResultsPageExists();
expect(status).toBeTruthy();

console.log('Searched Product count',await searchResultPage.getProductCount());

const statusProduct=await searchResultPage.isProductExist(testConfig.productName);
expect(statusProduct).toBeTruthy();

await searchResultPage.selectProduct(testConfig.productName);

await productPage.setQuantity(testConfig.productQuantity);
await productPage.addToCart();
const confStatus=await productPage.isConfirmationMessageVisible();
expect(confStatus).toBeTruthy();

});


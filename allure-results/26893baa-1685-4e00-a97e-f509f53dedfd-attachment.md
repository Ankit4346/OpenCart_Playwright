# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccountRegistration.spec.ts >> Account Registration
- Location: tests\AccountRegistration.spec.ts:43:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'My Account' }) resolved to 2 elements:
    1) <a title="My Account" data-toggle="dropdown" class="dropdown-toggle" href="https://tutorialsninja.com/demo/index.php?route=account/account">…</a> aka getByRole('link', { name: ' My Account' })
    2) <a href="https://tutorialsninja.com/demo/index.php?route=account/account">My Account</a> aka getByRole('link', { name: 'My Account', exact: true })

Call log:
  - waiting for getByRole('link', { name: 'My Account' })

```

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#input-firstname')

```

# Test source

```ts
  1  | import {Page,expect,Locator} from '@playwright/test';
  2  | 
  3  | export class RegistrationPage {
  4  | 
  5  |  private readonly page: Page;
  6  |     
  7  |     // Locators using CSS selectors
  8  |     private readonly txtFirstname: Locator;
  9  |     private readonly txtLastname: Locator;
  10 |     private readonly txtEmail: Locator;
  11 |     private readonly txtTelephone: Locator;
  12 |     private readonly txtPassword: Locator;
  13 |     private readonly txtConfirmPassword: Locator;
  14 |     private readonly chkdPolicy: Locator;
  15 |     private readonly btnContinue: Locator;
  16 |     private readonly msgConfirmation: Locator;
  17 | 
  18 | constructor(page:Page){
  19 | 
  20 |    this.page = page;
  21 |         
  22 |         // Initialize locators with CSS selectors
  23 |         this.txtFirstname = page.locator('#input-firstname');
  24 |         this.txtLastname = page.locator('#input-lastname');
  25 |         this.txtEmail = page.locator('#input-email');
  26 |         this.txtTelephone = page.locator('#input-telephone');
  27 |         this.txtPassword = page.locator('#input-password');
  28 |         this.txtConfirmPassword = page.locator('#input-confirm');
  29 |         this.chkdPolicy = page.locator('input[name="agree"]');
  30 |         this.btnContinue = page.locator('input[value="Continue"]');
  31 |         this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
  32 | 
  33 | }
  34 | 
  35 |  /**
  36 |      * Sets the first name in the registration form
  37 |      * @param fname - First name to enter
  38 |      */
  39 |     async setFirstName(fname: string): Promise<void> {
> 40 |         await this.txtFirstname.fill(fname);
     |                                 ^ Error: locator.fill: Target page, context or browser has been closed
  41 |     }
  42 | 
  43 | 
  44 |     async setLastName(lname: string): Promise<void> {
  45 |         await this.txtLastname.fill(lname);
  46 |     }
  47 | 
  48 |     async setEmail(email: string): Promise<void> {
  49 |         await this.txtEmail.fill(email);
  50 |     }
  51 | 
  52 |    
  53 |     async setTelephone(tel: string): Promise<void> {
  54 |         await this.txtTelephone.fill(tel);
  55 |     }
  56 | 
  57 |     async setPassword(pwd: string): Promise<void> {
  58 |         await this.txtPassword.fill(pwd);
  59 |     }
  60 | 
  61 |  
  62 |     async setConfirmPassword(pwd: string): Promise<void> {
  63 |         await this.txtConfirmPassword.fill(pwd);
  64 |     }
  65 | 
  66 |   
  67 |     async setPrivacyPolicy(): Promise<void> {
  68 |         await this.chkdPolicy.check();
  69 |     }
  70 | 
  71 |     async clickContinue(): Promise<void> {
  72 |         await this.btnContinue.click();
  73 |     }
  74 | 
  75 |   
  76 |     async getConfirmationMsg(): Promise<string> {
  77 |         return await this.msgConfirmation.textContent() ?? '';
  78 |     }
  79 | 
  80 | 
  81 |     async completeRegistration(userData: {
  82 |         firstName: string;
  83 |         lastName: string;
  84 |         email: string;
  85 |         telephone: string;
  86 |         password: string;
  87 |     }): Promise<void> { 
  88 |         await this.setFirstName(userData.firstName);
  89 |         await this.setLastName(userData.lastName);
  90 |         await this.setEmail(userData.email);
  91 |         await this.setTelephone(userData.telephone);
  92 |         await this.setPassword(userData.password);
  93 |         await this.setConfirmPassword(userData.password);
  94 |         await this.setPrivacyPolicy();
  95 |         await this.clickContinue();
  96 |         await expect(this.msgConfirmation).toBeVisible();
  97 |     }
  98 | 
  99 | }
```
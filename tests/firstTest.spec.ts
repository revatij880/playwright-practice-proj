import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

/*test('Locator strategy', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //combine different selector
    page.locator('input [placeholder="Email"][nbinput]')

    //by xpath
    page.locator('//*[id = "#inputEmail1"]')

    //by partial  text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

})


test('User facing', async({page}) => {

    await page.getByRole('textbox', {name : "Email"}).first().click()
    await page.getByRole('button',{name : "Sign up"}).first().click()

    await page.getByPlaceholder('Jane Doe').click()

}) 

test('Child elements', async({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    // await page.locator('nb-card').locator('nd-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name : "Sign in "}).first().click()
}) 

test('locating parent element', async({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name : "Email"}).first().click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()


    //below is xpath method 
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})
    */


test('Reusing locators', async({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    /* To avoid below duplication we are using above way
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test123@xoxo.com')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('text12345')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click() */


    // One way
    // await basicForm.getByRole('textbox', {name: "Email"}).fill('test123@xoxo.com')
    // await basicForm.getByRole('textbox', {name: "Password"}).fill('text12345')
    // await basicForm.getByRole('button').click()

    // Second way
    await emailField.fill('test123@xoxo.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('text12345')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test123@xoxo.com')
    
})

test('Extracting values', async({page})=> {

// single test value
 const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
 const buttonText = await basicForm.locator('button').textContent()
 expect(buttonText).toEqual('Submit')

 // all text content
 const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
expect(allRadioButtonLabels).toContain("Option 1")

// input value
const emailField = basicForm.getByRole('textbox', {name : "Email"})
await emailField.fill('test123@xoxo.com')
const emailValue = await emailField.inputValue()
expect(emailValue).toEqual('test123@xoxo.com')

const placeholder = await emailField.getAttribute('placeholder')
expect(placeholder).toEqual('Email')
})

test('Assertions', async({page})=> {

    //Type 1 - General Asertions

    // const value = 5
    // expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Type 2 - Locator Assertions
    await expect(basicFormButton).toHaveText('Submit')


    //Type 3 - Soft Assertions
    await expect(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
    
})
// test('Auto waiting', async({page})=> {

//     // Using another website to test this concept


    
// })


// test('Extracting values', async({page})=> {

    
// })
// test('Extracting values', async({page})=> {

    
// })




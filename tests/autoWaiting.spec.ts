import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page})=> {

    const successButton = page.locator('.bg-success')
    await successButton.click()

    // Method 1
    // const text = await successButton.textContent()
    //  expect(text).toEqual('Data loaded with AJAX get request.')

   
    // Method 2
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('Alternative waits', async({page})=> {

    const successButton = page.locator('.bg-success')
    
    //__ wait for elements
    await page.waitForSelector('.bg-success')

   
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')


    //__ wait for perticular response

    await page.waitForResponse('http://www.uitestingplayground.com/ajax')

    const textOne = await successButton.allTextContents()
    expect(textOne).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
   // one way
    // test.setTimeout(100000)
   
   // second way
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()

})
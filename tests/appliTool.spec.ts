// import {test, expect} from '@playwright/test'
import {test} from '@applitools/eyes-playwright/fixture'

test('Applitools Visual Test', async({page, eyes}) => {

    await page.goto('http://localhost:4200/')

    await eyes.check('Home is here')

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

     await eyes.check('form is here')
})

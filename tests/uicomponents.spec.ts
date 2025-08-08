import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('UI Components', () => {

    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
    test('input fields', async({page})=> {

    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    await usingTheGridEmailInput.fill('test@xoxo.com')
    // await usingTheGridEmailInput.clear()

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test@xoxo.com')

    //locator assertion

    await expect(usingTheGridEmailInput).toHaveValue('test@xoxo.com')
    })


    test('Radio buttons ', async({page})=> {
    const usingTheGridEmailForm = page.locator('nb-card', {hasText: "Using the Grid"})
    
    // If the elements are visually hidden the we need to use force:true

    // await usingTheGridEmailForm.getByLabel('Option 1').check({force: true})
    await usingTheGridEmailForm.getByRole('radio', {name: 'Option 1'}).check({force: true})


    const radioButtonStatus = await usingTheGridEmailForm.getByRole('radio', {name: 'Option 1'}).isChecked()
    expect(radioButtonStatus).toBeTruthy()

    await usingTheGridEmailForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
    expect(await usingTheGridEmailForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
    expect(await usingTheGridEmailForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()

    })

    test('Checkboxes ', async({page})=> {
        
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    
    await page.getByRole('checkbox',{name : "Hide on click"}).click({force:true})

    // You can use - check() & uncheck() methods

    const allboxes = page.getByRole('checkbox')
    for(const box of await allboxes.all()){

        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
    })


    test('list and dropdowns', async({page})=> {

        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') //when the list has UI tag
        page.getByRole('listitem') // when the list has LI tag

        // one way
        // const optionList = page.getByRole('list').locator('nb-option')

        // second way
       const optionList = page.locator('nb-option list nb-option')
       await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Coporate"])

       //Select one option- do below steps

       await optionList.filter({hasText: "Cosmic"}).click()
    
    })

    test('Web tables', async({page})=> {

        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    
        //1. Get the row by any text in the row
        const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
        await targetRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('35')
        await page.locator('.nd-checkmark').click()

        //2. Get the row based on the value from the specific col
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        const targetRowId = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowId.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('abc@gmail.com')
        await page.locator('.nd-checkmark').click()

        //Add assertion to verify the text is updated
        await expect(targetRowId.locator('td').nth(5)).toHaveText('abc@gmail.com')

})

    test('Date picker', async({page})=> {

        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calenderinputField = page.getByPlaceholder('Form Picker')
        await calenderinputField.click()

        await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
        await expect(calenderinputField).toHaveValue('Jul 1, 2025')

    })

    test('Datepicker javascript methods ', async({page})=> {

        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calenderinputField = page.getByPlaceholder('Form Picker')
        await calenderinputField.click()

        let date = new Date()
        date.setDate(date.getDate()+ 140)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const datetoAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calenderMonthAndYear.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await expect(calenderinputField).toHaveValue(datetoAssert)
    })


    test('Sliders', async({page})=> {
        // Update attribute
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await tempGauge.evaluate( node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })
        await tempGauge.click()

        //Mouse movement
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()

        const box = await tempBox.boundingBox()
        const x = box.x + box.width / 2
        const y = box.x + box.height / 2
        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x +100,y)
        await page.mouse.move(x+100, y+100)
        await page.mouse.up()
       await expect(tempBox).toContainText('30')
    })


})
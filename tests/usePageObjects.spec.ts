import {test, expect} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { DatepickerPage } from '../page-objects/datePickerpage'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page})=> {
    const pm = new PageManager(page)
    // const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutspage()
    // await navigateTo.datepickerPage()
    // await navigateTo.smartTablePage()
    // await navigateTo.toastrPage()

    await pm.navigateTo().formLayoutspage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()



})

// test('', async({page}) =>{


// })

test('parameterize methods', async({page}) =>{
    // const navigateTo = new NavigationPage(page)
    // const formLayoutPage = new FormLayoutPage(page) 
    // const onDatePickerPage = new DatepickerPage(page)

    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutspage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndOption('test@xoxo.com', 'password123', 'Option 1')
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('John','jon@gmail.com', false)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    // await pm.onDatePickerPage().selecDatepickerwithRangeFromToday(25,29)

})
import {test, expect, Page, Locator} from '@playwright/test'
import { HelperBase } from './helperBase'



export class NavigationPage extends HelperBase{


    readonly page: Page
    readonly formLayoutsManuItem: Locator
    readonly datePickerMenuItem:Locator
    readonly smartTableMenuItem:Locator
    readonly toastMenuItem:Locator

    constructor(page: Page){
        // this.page = page
        super(page)
        this.formLayoutsManuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.toastMenuItem = page.getByText('Toastr')
        this.smartTableMenuItem = page.getByText('Smart Table')
    }

    async formLayoutspage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsManuItem.click()
        await this.waitForNumberOfSeconds(2)

    }

    async datepickerPage(){

        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datePickerMenuItem.click()

    }
    async toastrPage(){

    // await this.page.getByText('Modal & Overlays').click()

    await this.selectGroupMenuItem('Modal & Overlays')
    await this.toastMenuItem.click()

    }
    async smartTablePage(){

        // await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){

        const groupmenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupmenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupmenuItem.click()
    }
}
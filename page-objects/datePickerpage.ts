import { Page,expect } from "@playwright/test";

export class DatepickerPage{

    private readonly page: Page

    constructor(page: Page)
    {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        
        const calenderinputField = this.page.getByPlaceholder('Form Picker')
                await calenderinputField.click()
                const datetoAssert = await this.selectDateInTheCAlendar(numberOfDaysFromToday)
                await expect(calenderinputField).toHaveValue(datetoAssert)
    }

    async selecDatepickerwithRangeFromToday(startDayFromToday: number, endDayFromToday: number){

            const calenderinputField = this.page.getByPlaceholder('Range Picker')
            await calenderinputField.click()
            const dateToAssertStart = await this.selectDateInTheCAlendar(startDayFromToday)
            const dateToAssertEnd = await this.selectDateInTheCAlendar(endDayFromToday)
            const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
            await expect(calenderinputField).toHaveValue(dateToAssert)
    }


    private async selectDateInTheCAlendar (numberOfDaysFromToday: number) {
        let date = new Date()
                date.setDate(date.getDate()+ numberOfDaysFromToday)
                const expectedDate = date.getDate().toString()
                const expectedMonthShot = date.toLocaleDateString('En-US', {month: 'short'})
                const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
                const expectedYear = date.getFullYear()
                const datetoAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
        
                let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
                while(!calenderMonthAndYear.includes(expectedMonthAndYear)){
                    await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                    calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                }
        
                await this.page.locator('.day-cellng-star-inserted').getByText(expectedDate, {exact: true}).click()
                return datetoAssert
    }
}
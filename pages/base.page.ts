import {Page} from '@playwright/test';
export class BasePage{
    page: Page;
    constructor(page:Page){
        this.page=page;
    }
    async navigate(url:string):Promise<void>{
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToHeader(text:string):Promise<void>{
        await this.page.getByRole('navigation').locator('div').getByRole('link', { name: text }).click();
    }
    async getTitle():Promise<string>{
        return await this.page.title();
    }

}
import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CommonModulePage extends BasePage{
    [x: string]: any;
    page: Page;
    constructor(page:Page){
        super(page);
        this.page = page;
    }
    
    async getMenuHeading(): Promise<number> {
        const text = await this.page.locator('header > span').filter({ hasText: /\d+/ }).innerText();
        const match = text.match(/\d+/);
        if (!match) {
            throw new Error(`Could not find product count in heading: "${text}"`);
        }
        return Number(match[0]);
    }

    async getMenuItemsCount(): Promise<number> {
        await this.page.locator('ul.grid').scrollIntoViewIfNeeded();
        await this.page.mouse.wheel(0, 1000);
        await this.page.waitForTimeout(1000);
        return await this.page.locator('ul.grid > li').count();
    }

    async getMenuItems(): Promise<string[]> {
        return await this.page.locator('ul.grid > li shop-list-item').locator('.title').allInnerTexts();
    }

}
import { Locator, Page } from '@playwright/test';
import {BasePage} from './base.page';

export class NavPage extends BasePage{
    page: Page;
    cart:Locator;
    constructor(page:Page){
        super(page);
        this.page=page;
        this.cart=this.page.getByRole('link', { name: 'cart' });
    }
    async getTitle():Promise<string>{
        return this.page.getByRole('navigation').locator('div').getByRole('link').first().innerText();
    }
    async getNavitems():Promise<string[]>{
        const links = this.page.locator('#tabContainer shop-tabs shop-tab').getByRole('link');
        await links.first().waitFor();
        return await links.allInnerTexts();
    }

    async getCartCount():Promise<Number>{
        const count=await this.cart.locator('div').innerText();
        return Number(count);
    }

    
    
}
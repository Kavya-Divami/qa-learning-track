import { test, expect, Page, BrowserContext } from "@playwright/test";
import { NavPage } from "../pages/nav.page";
import { CommonModulePage } from "../pages/commonmodule.page";
import navBarItems from "../test-data/navbar-items.json";
import menswear from "../test-data/mens-wear.json";

test.describe('Verifying the Application loads and category links are visible',()=>{
    let navBar:NavPage;
    let commonModulePage:CommonModulePage;
    let context: BrowserContext;
    let page: Page;
    
    test.beforeAll(async({browser})=>{
        context = await browser.newContext();
        page = await context.newPage();
        navBar = new NavPage(page);
        commonModulePage = new CommonModulePage(page);
        await navBar.navigate(" https://shop.polymer-project.org/");
    });

    test.fixme("After application loads verify that the cart count is zero",async()=>{
        const cartCount:Number=await navBar.getCartCount();
        expect(cartCount,"The cart count is zero").toBe(0);
    })

    test('1. Verify the application loads and the title is correct',async()=>{
        const title:string=await navBar.getTitle();
        const allItems:string[]=await navBar.getNavitems();

        expect(title,"The title of the page is SHOP").toBe("SHOP");
        expect(allItems,"The nav items are visible").toEqual(expect.arrayContaining(Object.values(navBarItems)));
        expect(await navBar.cart.isVisible(),"The cart link is visible").toBeTruthy();
    });

    test('2. Verify selecting a category lists respective products.',async()=>{
     
        await navBar.navigateToHeader("Men's Outerwear");
        const count:number=await commonModulePage.getMenuItemsCount();
        const heading:number=await commonModulePage.getMenuHeading();
        const getItems:string[]=await commonModulePage.getMenuItems();

        expect(heading, "The count of the items is not equal ").toBe(count);
        expect(getItems, "The items are not equal").toMatchObject(expect.arrayContaining(Object.values(menswear)));
    });
})



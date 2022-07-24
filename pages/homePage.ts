import { should } from "chai";
import { Key, WebElement } from "selenium-webdriver";
should();
import PageBase from "../pages/pageBase";

/**
 * This home page module contains all the corresponding selectors with user actions.
 */
class HomePage{

    public get searchField(): Promise<WebElement>{
        let element = PageBase.findElementByCss("input[name='q']");
        return element
    }

    public get searchButton(): Promise<WebElement>{
        let element = PageBase.findElementByCss("form[action='/search'] button[type='submit']");
        return element
    }

    /**
     * Helps to search the given product in search bar.
     * @param product : string
     */
    async searchProduct(product: string){
        await (await (this.searchField)).sendKeys(product, Key.ENTER);
        await PageBase.delay(5000);
    }
}

export default new HomePage();
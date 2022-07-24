import { WebElement } from "selenium-webdriver";
import PageBase from "../pages/pageBase";

/**
 * This search page module contains all the corresponding selectors with user actions.
 */
class SearchPage{

    public get priceRange(): Promise<WebElement>{
        let element = PageBase.findElementByCss("section:nth-child(3)>div:nth-child(4) div:last-child select");
        return element
    }

    public get priceValue(): Promise<WebElement>{
        let element = PageBase.findElementByCss("section:nth-child(3)>div:nth-child(4) div:last-child select option[value='50000']");
        return element
    }

    public get prices(): Promise<WebElement[]>{
        let elements = PageBase.findElementsByCss(".MIXNux+div>div+div> :first-child>div:nth-child(1)>div:nth-child(1)");
        return elements
    }

    public get addToCartButton(): Promise<WebElement>{
        let element = PageBase.findElementByCss(".row li.col:nth-child(1) button");
        return element
    }

    public get totalAmount(): Promise<WebElement>{
        let element = PageBase.findElementByCss(".dimARw :nth-child(5) :nth-child(2) :nth-child(2)");
        return element
    }

    async applyPriceFilter(){
        (await this.priceRange).click();
        await PageBase.delay(5000);
        (await this.priceValue).click();
        await PageBase.delay(5000);
    }

    async getIndividualProductPricesInSearch():Promise<number[]>{
        let individualProductPrices: number[] = [];
        let priceList = (await this.prices);
        for(let i=0; i<=priceList.length-1; i++){
            let priceWithoutSpecialChar = (await priceList[i].getText()).replace(/[^0-9]/g, '');
                let price = Number(priceWithoutSpecialChar);
                individualProductPrices.push(price);
        }
        return individualProductPrices;
    }

    async getProductCountInSearch():Promise<number>{
        let totalItems = (await this.prices);
        return totalItems.length
    }

    async getTotalAmountFromMyCart():Promise<number>{
        let amount: number = parseInt((await (await this.totalAmount).getText()).replace(/[^0-9]/g, ''));
        return amount;
    }

    /**
     * Helps to select all the iphone 11 products listed under 50,000.00 inr.
     */
    async addItemsToCart(){
        let priceList = (await this.prices);
        for(let i=0; i<=priceList.length-1; i++){
            try{
                let priceWithoutSpecialChar = (await priceList[i].getText()).replace(/[^0-9]/g, '');
                let price = Number(priceWithoutSpecialChar);
                if(price<=50000){
                    priceList[i].click();
                    await PageBase.delay(5000);
                    let sessions: string[] = (await PageBase.getBrowserSessions());
                    var parentTab = sessions[0];
                    var newTab = sessions[1];
                    await PageBase.switchToWindow(newTab);
                    await (await this.addToCartButton).click();
                    console.log('Successfully product added to cart section.')
                    await PageBase.delay(5000);
                    PageBase.closeCurrentBrowserSession();
                    await PageBase.switchToWindow(parentTab);
                }
            }
            catch(Exception: any){
                console.warn('Trouble in runtime due to having duplicate pruducts.')
                break;
            }
        }
    }
}

export default new SearchPage();
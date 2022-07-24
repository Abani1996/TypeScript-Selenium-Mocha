import { should } from "chai";
import { WebElement } from "selenium-webdriver";
should();
import PageBase  from "../pages/pageBase";

/**
 *  This add to cart module contains all the corresponding selectors with user actions.
 */
class AddToCartPage{

    public get myCartButton(): Promise<WebElement>{
        let element = PageBase.findElementByCss("a[href*='viewcart']");
        return element
    }

    public get iphonePrices(): Promise<WebElement[]>{
        let elements = PageBase.findElementsByCss("a[href*='apple']+div:nth-child(2)> :nth-child(4)");
        return elements
    }

    public get iphoneCount(): Promise<WebElement[]>{
        let elements = PageBase.findElementsByCss("a[href*='apple']+div a[href*='apple']");
        return elements
    }

    public get prices(): Promise<WebElement[]>{
        let elements = PageBase.findElementsByCss("a[href*='apple']+div :nth-child(4)");
        return elements
    }
    
    /**
     * Helps to click on add to cart button.
     */
    async clickOnMyCartButton(){
        (await this.myCartButton).click();
        await PageBase.delay(5000);
    }

    async getProductCountInMyCart():Promise<number>{
        let count = (await this.iphoneCount).length;
        await PageBase.delay(5000);
        return count;
    }

    async getTotalAmountOfAddToCart():Promise<number>{
        let sum: number = 0;
        let priceList = (await this.iphonePrices);
        for(let i=0; i<=priceList.length-1; i++){
            let removeSpecialChar = (await priceList[i].getText()).replace(/[^0-9]/g, '');
            let price = parseInt(removeSpecialChar);
            console.log('Price is: '+ price)
            sum += price;
        }
        return sum;
    }

    async getIndividualProductPricesInMyCart():Promise<number[]>{
        let individualProductPrices: number[] = [];
        let priceList = (await this.prices);
        for(let i=0; i<=priceList.length-1; i++){
            let priceWithoutSpecialChar = (await priceList[i].getText()).replace(/[^0-9]/g, '');
                let price = Number(priceWithoutSpecialChar);
                individualProductPrices.push(price);
        }
        return individualProductPrices;
    }
}

export default new AddToCartPage();
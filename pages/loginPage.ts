import { should } from "chai";
import { WebElement } from "selenium-webdriver";
should();
import PageBase from "../pages/pageBase";

/**
 * This login page module contains all the corresponding selectors with user actions.
 */
class LoginPage{

    public get usernameField(): Promise<WebElement>{
        let element = PageBase.findElementByCss("form[autocomplete] input[type='text']");
        return element
    }

    public get passwordField(): Promise<WebElement>{
        let element = PageBase.findElementByCss("form[autocomplete] input[type='password']");
        return element
    }

    public get loginButton(): Promise<WebElement>{
        let element = PageBase.findElementByCss("form[autocomplete] button[type='submit']");
        return element
    }
    
    /**
     * Helps to login in flipkart by given credentials.
     * @param username 
     * @param password 
     */
    async login(username:string, password:string){
        await PageBase.delay(5000);
        (await this.usernameField).sendKeys(username);
        console.log('Entered user name');
        (await this.passwordField).sendKeys(password);
        console.log('Entered password');
        (await this.loginButton).click();
        console.log('Successfully logged in.')
        await PageBase.delay(5000);
    }
}

export default new LoginPage();
import * as webdriver from 'selenium-webdriver';
var driver: webdriver.ThenableWebDriver;

/**
 * Helps to initialize the driver and added generic functions.
 */
class PageBase{

    /**
     * Helps to lunch browser.
     * @param browserName 
     */
    lunch(browserName: string){
        driver = new webdriver.Builder().forBrowser(browserName).build();
        driver.manage().setTimeouts({implicit: 10000});
    }
    /**
     * Helps to navigate to the given url.
     * @param url : string
     */
    visit(url: string){
        driver.get(url);
        driver.manage().window().maximize();
    }

    /**
     * Helps to close the current browser session.
     */
    public closeCurrentBrowserSession(){
        driver.close();
    }

    /**
     * Helps to close the all browser session.
     */
    public closeAllBrowserSessions(){
        driver.quit();
    }

    /**
     * Helps to set the time out.
     * @param ms : time in ms
     * @returns : promise
     */
     public async delay(ms: number): Promise<void> {
        return await new Promise( resolve => setTimeout(resolve, ms) );
    }

    /**
     * Helps to get a single webelement using css selector.
     * @param selector : Selector
     * @returns : WebElement
     */
    public async findElementByCss(selector: string): Promise<webdriver.WebElement> {
        return await driver.findElement(webdriver.By.css(selector));
    }

    /**
     * Helps to get multiple webelements using css selector.
     * @param selector : Selector
     * @returns : WebElements
     */
    public async findElementsByCss(selector: string): Promise<webdriver.WebElement[]> {
        return await driver.findElements(webdriver.By.css(selector));
    }

    /**
     * Helps to get the browser session's ids opend by driver.
     * @returns : Browser session's ids.
     */
    public async getBrowserSessions(): Promise<string[]>{
        let sessions:string[] = await driver.getAllWindowHandles();
        await this.delay(5000);
        return sessions;
    }

    /**
     * Helps to switch to the given window.
     * @param sessionId : Browser's session id
     */
    public async switchToWindow(sessionId: string){
        await driver.switchTo().window(sessionId);
        await this.delay(5000);
    }
}

export default new PageBase();

import { expect, should } from "chai";
should();
import PageBase  from "../pages/pageBase";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import SearchPage from "../pages/searchPage";
import AddToCartPage from "../pages/addToCartPage";

describe('flipkart app test', function(){

    beforeEach(function(){
        PageBase.lunch('chrome');
        let url = 'https://www.flipkart.com'
        PageBase.visit(url);
    });

    afterEach(function(){
        PageBase.closeAllBrowserSessions();
    });

    it('Test add to cart functionality', async function(){
        var username: string = 'xxxxxxxxxxxx';
        var password: string = 'xxxxxxxxxxxx';
        var item: string = 'iphone 11';

        await LoginPage.login(username, password);
        await HomePage.searchProduct(item);
        await SearchPage.applyPriceFilter();

        let actualProductCount = await SearchPage.getProductCountInSearch();
        let actualIndividualProductPrices = await SearchPage.getIndividualProductPricesInSearch();
        let actualTotalAmount: number = await AddToCartPage.getTotalAmountOfAddToCart()

        await SearchPage.addItemsToCart();
        await AddToCartPage.clickOnMyCartButton();

        let expectedIndividualProductPrices = await AddToCartPage.getIndividualProductPricesInMyCart();
        let expectedProductCount = await AddToCartPage.getProductCountInMyCart();
        let expectedTotalAmount: number = await SearchPage.getTotalAmountFromMyCart();

        expect(actualIndividualProductPrices).to.equal(expectedIndividualProductPrices, 'Individual product prices mismatch')
        expect(actualProductCount).to.equal(expectedProductCount, 'product count mismatch')
        expect(actualTotalAmount).to.equal(expectedTotalAmount, 'Total amount mismatch')
    });

})
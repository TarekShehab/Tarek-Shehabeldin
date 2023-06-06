const { HomePage } = require('../Pages/HomePage.js');
const { BaseClass } = require('./Base');


class HomePageLib extends BaseClass
{
    constructor() {
        super();
    }

    async ClickTryMyLuck(IterationInstance) {
        const homepage = new HomePage(IterationInstance.KeepPage);
        await homepage.ClickTryMyLuckButton();
        await this.delay(1000);
    }
    
    async ClickOnLanguage(IterationInstance) {
        const homepage = new HomePage(IterationInstance.KeepPage);
        await homepage.ClickLanguageButton();
        await this.delay(1000);
    }
    
    async getLanguage(IterationInstance) {
        const homepage = new HomePage(IterationInstance.KeepPage);
        const lang = await homepage.getPageLanguage();
        await this.delay(1000);
        return lang;
    }
    
    async search(IterationInstance, website) {
        const homepage = new HomePage(IterationInstance.KeepPage);
        await homepage.searchWithText(website);
    }
    
    async getSearchResults(IterationInstance) {
        const homepage = new HomePage(IterationInstance.KeepPage);
        const results = await homepage.getResults();
        await this.delay(1000);
        // console.log("Results in homepagelib ===========>", results);
        return results;
    }
}

module.exports.HomePageLib = HomePageLib
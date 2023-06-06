const playwright = require('playwright');


class HomePage
{
    constructor(page) {
        this.page = page;
    }

    // Selectors
    TryMyLuckButton = '//body/div[1]/div[3]/form[1]/div[1]/div[1]/div[4]/center[1]/input[2]';
    LanguageButton = 'div.L3eUgb:nth-child(2) div.o3j99.qarstb:nth-child(4) div.vcVZ7d:nth-child(2) div:nth-child(2) > a:nth-child(1)';
    SearchBar = 'textarea.gLFyf';
    ResultsHeadings = 'h3.LC20lb';

    // Clicks the "Try My Luck" button
    async ClickTryMyLuckButton() {
        await this.page.waitForSelector(this.TryMyLuckButton,{timeout: 10000},{visible: true});
        await this.page.click(this.TryMyLuckButton,{waitUntil: 'domcontentloaded'})
    }
    
    // Clicks the ither language button
    async ClickLanguageButton() {
        await this.page.waitForSelector(this.LanguageButton,{timeout: 10000},{visible: true});
        await this.page.click(this.LanguageButton,{waitUntil: 'domcontentloaded'})
    }
    
    // Fetches the language on the HTML document
    async getPageLanguage() {
        const htmlPage = await this.page.$('html');
        const lang = await htmlPage.getAttribute('lang')
        return lang
    }

    // Fills the search bar and clicks "Enter" to view results
    async searchWithText(website) {
        await this.page.waitForSelector(this.SearchBar,{timeout: 10000},{visible: true});
        const searchBar = await this.page.$('textarea');
        await searchBar.fill(website);
        await this.page.keyboard.press('Enter');
    }

    // Returns an array of strings with the titles of each search result
    async getResults() {
        await this.page.waitForSelector(this.ResultsHeadings,{timeout: 10000},{visible: true});
        let results = await this.page.$$(this.ResultsHeadings)
        let resultsHeadings = []
        
        for(let r of results){
            resultsHeadings.push(await r.innerText())
        }

        return resultsHeadings
    }
}

module.exports.HomePage = HomePage;

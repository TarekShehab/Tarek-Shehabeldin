const playwright = require('playwright');

class TryMyLuckPage
{
    constructor(page) {
        this.page = page;
    }

    // Fetches the current page URL
    async getPageURL() {
        const pageURL = await this.page.url()
        return pageURL
    }   

}

module.exports.TryMyLuckPage = TryMyLuckPage;
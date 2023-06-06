const { TryMyLuckPage } = require('../Pages/TryMyLuckPage.js');
const { BaseClass } = require('./Base');

class TryMyLuckLib extends BaseClass
{
    constructor() {
        super();
    }

    async getCurrentURL(IterationInstance) {
        const trymyluck = new TryMyLuckPage(IterationInstance.KeepPage);
        const currentURL = await trymyluck.getPageURL();
        await this.delay(1000);
        return currentURL
    }
}

module.exports.TryMyLuckLib = TryMyLuckLib;

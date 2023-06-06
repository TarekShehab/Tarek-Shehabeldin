const {
    Given,
    When,
    Then,
} = require("@cucumber/cucumber");

var {
    setDefaultTimeout
} = require('@cucumber/cucumber');

const assert = require("assert").strict;

setDefaultTimeout(120 * 1000);
  
When('I click on the language button', async () => {
    await DoIteration.HomepageLib.ClickOnLanguage(DoIteration);
});

Then('I am directed to google home page with the choosen language',async(ParameterData) => {
    DoIteration.expectedLanguage = ParameterData.raw()[1][0];
    const actualLang = await DoIteration.HomepageLib.getLanguage(DoIteration);
    assert.equal(actualLang, DoIteration.expectedLanguage);
});



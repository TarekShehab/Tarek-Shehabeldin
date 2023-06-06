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
  
  
Given('I am on the google home page', async () => {
    await DoIteration.StartUpAndLogin()
});

When('I click on try my luck button', async ()=> {
    await DoIteration.HomepageLib.ClickTryMyLuck(DoIteration)
});

Then('I am directed to doodles page',async(ParameterData)=> {
    DoIteration.doodlesURL = ParameterData.raw()[1][0]
    let actualURL = await DoIteration.TryMyLuckLib.getCurrentURL(DoIteration)
    assert.equal(actualURL, DoIteration.doodlesURL)
});



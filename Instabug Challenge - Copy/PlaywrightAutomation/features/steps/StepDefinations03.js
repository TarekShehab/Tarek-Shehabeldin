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
  
When('I search for a website name', async (ParameterData) => {
    DoIteration.website = ParameterData.raw()[1][0]
    await DoIteration.HomepageLib.search(DoIteration, DoIteration.website)
});

Then('I can find the website in the results',async(ParameterData) => {
    DoIteration.expectedHeading = ParameterData.raw()[1][0]
    const searchResults = await DoIteration.HomepageLib.getSearchResults(DoIteration)
    assert(searchResults.includes(DoIteration.expectedHeading))
});



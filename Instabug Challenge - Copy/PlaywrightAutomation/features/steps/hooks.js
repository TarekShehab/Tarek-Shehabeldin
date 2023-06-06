let IterationLib = require('../../FrameworkClass');

var dateFormat = require('dateformat');

const {
  Given,
  When,
  Then,
  AfterStep,
  BeforeAll,
  AfterAll,
  Before,
  After
} = require("@cucumber/cucumber");

var fs = require('fs');

var {
  setDefaultTimeout
} = require('@cucumber/cucumber');

setDefaultTimeout(120 * 1000);

BeforeAll(async () => {
  this.ResultsName = "Result-" + dateFormat(this.now, "yyyy-mm-dd-HH-MM-ss")

  console.log("Overall Result Name: " + this.ResultsName)

  this.dir = "./execution_results/" + this.ResultsName

  if (!fs.existsSync(this.dir)) {
    fs.mkdirSync(this.dir);
  }

  DoIteration = new IterationLib.Iteration(this.ResultsName);

  DoIteration.ScenarioStatus = "NOT-COMPLETED"
});

Before(() => {
  console.log("Before Scenario called")
  DoIteration.ScenarioStatus = "NOT-COMPLETED"
  console.log("Status is: " + DoIteration.ScenarioStatus)
});

AfterStep(function ({
  result
}) {

  console.log("AfterStep called")
  console.log(result.status)
  let expectedresultStatus = "PASSED"
  let actualresultstatus = result.status
  if((actualresultstatus.localeCompare(expectedresultStatus))!=0)

  {

    DoIteration.KeepVideo = 1
    DoIteration.FinaliseVideo()
    DoIteration.CaptureScreen()

  }

});

After(() => {
  console.log("After Scenario called")
  console.log("Status is: " + DoIteration.ScenarioStatus)
  DoIteration.Finish()
});

AfterAll(() => {
  console.log("AfterAll called")
  if (DoIteration.NeedToClearBrowser == "True") {
    DoIteration.Finish()
  }
});
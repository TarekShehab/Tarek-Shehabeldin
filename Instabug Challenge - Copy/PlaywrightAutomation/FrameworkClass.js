let HelperLibrary = require('./HelperClass');
const config = require("./config");
let HomePageLibrary = require('./MethodsLib/HomePageMethods');
let TryMyLuckPageLibrary = require('./MethodsLib/TryMyLuckPageMethods');

const {
    BaseClass
} = require('./MethodsLib/Base');

const playwright = require('playwright');

const TheUid = require('uuid');

const {
    saveVideo
} = require('playwright-video');

var now = require('performance-now');

var dateFormat = require('dateformat');

var fs = require('fs');

const ExcelLib = require('exceljs')

class Iteration extends BaseClass {

    constructor(ResultIdentifier) {
        super();

        this.IsParallel = process.env.CUCUMBER_PARALLEL
        console.log("this.IsParallel " + this.IsParallel)
        if (this.IsParallel) {
            this.WorkerId = Number(process.env.CUCUMBER_WORKER_ID) + 1
        } else {
            this.WorkerId = 1
        }

        console.log("this.WorkerId is: " + this.WorkerId)
         
        this.HomepageLib = new HomePageLibrary.HomePageLib(this)       
        this.HelperLibrary = new HelperLibrary.HelperLib(this)
        this.TryMyLuckLib = new TryMyLuckPageLibrary.TryMyLuckLib(this)   
        
        this.VideoFails = false
        this.CaptureContentOnFail = false

        this.ResultsName = ResultIdentifier

        this.VideoScenario = (`${config.CaptureVideo}` === "true"); 
        this.KeepVideo = 1 
    }


    async CreateUserSubFolder() {
        this.chosen_number = this.WorkerId * 2
        await this.delayfixed(this.chosen_number * 1000);
     
        this.userdir = "./execution_results/" + this.ResultsName + "/" + "RESULTS" + "_" + this.WorkerId

        if (!fs.existsSync(this.userdir)) {
            fs.mkdirSync(this.userdir);
        }
    }

    IntitialiseLogging() {
        this.log_file = fs.createWriteStream(this.userdir + '/user.log', {
            flags: 'a'
        });
    }

    WriteLog(d) {
        console.log(d)
        this.log_file.write(d + '\r\n');
    };

    StartTransaction(NameOfTransaction) {
        this.TransactionName = NameOfTransaction
        this.TransactionDateTime = new Date()
        this.TransactionStartTime = now()
        this.WriteLog("Starting transaction: " + NameOfTransaction)
    }

    EndTransaction(NameOfTransaction, StatusOfTransaction) {

        this.TransactionEndTime = now()
        if (StatusOfTransaction == 'Pass') {
            this.TransactionStatus = 'Pass'
        } else {
            this.TransactionStatus = 'Fail'
        }
        this.WriteLog("Ending transaction : " + this.TransactionName + " with Status: " + this.TransactionStatus)
        if (this.TransactionStatus == 'Pass') {
            this.TransactionTime = (this.TransactionEndTime - this.TransactionStartTime) / 1000;
            this.TransactionTime = this.TransactionTime.toFixed(4)
            this.WriteLog("Transaction : " + NameOfTransaction + " Transaction Time in secs:" + this.TransactionTime)
        }
        this.TransactionStatus = "None"
    }

    async CaptureScreen() {
        this.WriteLog("Step failed - capturing screen")

        if (this.CaptureContentOnFail == true) 
        {
        

            this.WriteLog("Step failed - capturing screen")
            this.content = await DoIteration.KeepPage.content();
            this.WriteLog(this.content);     
        }

        this.now = new Date()
        this.send = dateFormat(this.now, "yyyy-mm-dd h-mm-ss")
        this.filedestination = DoIteration.userdir + "/" + this.send + "_" + "Screenshot" + ".jpg"
        DoIteration.WriteLog(this.filedestination)

        try {

            await this.KeepPage.screenshot({
                path: this.filedestination
            });
        } 
        catch (error) {
            this.WriteLog("Screenshot error: " + error)
        }

        if (this.VideoFails == true) {
            this.videodestination = DoIteration.userdir + "/" + this.send + "_" + "Video" + ".mp4"

            this.WriteLog("Video destination: " + this.videodestination)

            try {

                const capture = await saveVideo(DoIteration.KeepPage, this.videodestination)
                await this.delayfixed(3000)
                await capture.stop()
                this.WriteLog("Video capture stopped")


            } catch (error) {
                this.WriteLog("Video Capture error: " + error)
            }
        }
        DoIteration.delayfixed(3000)
    }

    async StartUp() {
        await this.CreateUserSubFolder()

        this.IntitialiseLogging()

        var browser;

        if(`${config.Browser}` == 'chromium')
        {browser = await playwright.chromium.launch({headless: false, slowMo: 250, args: ['--start-maximized']});}
 
         //Edge
         if(`${config.Browser}` == 'edge')
         {browser = await playwright.chromium.launch({channel:'msedge',headless: false, slowMo: 250, args: ['--start-maximized']});}
  
         //Firefox
         if(`${config.Browser}` == 'firefox')
         {browser = await playwright.firefox.launch({headless:false, slowMo: 250, args: ['--start-fullscreen']});}
         
        const bc = await browser.newContext({
            ignoreHTTPSErrors: true,
            slowMo: 250,
            args: ['--auth-server-whitelist="_"'],
        });

        this.KeepBrowser = browser;
        const page = await bc.newPage();
        await page.setViewportSize({
            width: 1400,
            height: 800
        });

        this.KeepPage = page;
        await this.delay(4000);


        if (this.VideoScenario == true) {

            this.now = new Date()

            this.send = dateFormat(this.now, "yyyy-mm-dd h-mm-ss")

            this.videodestination = this.userdir + "/" + this.send + "_" + "Video" + ".mp4"

            console.log("Video destination: " + this.videodestination)

            try {

                this.capture = await saveVideo(this.KeepPage, this.videodestination)

                console.log("Video Capture Started ...")
            } catch (error) {
                console.log("Video Capture error: " + error)
            }

        }
    }

    async Login() {

        this.chosen_number = this.WorkerId * 5
        this.WriteLog("Login delay is " + this.chosen_number)

        await this.delayfixed(this.chosen_number * 1000);

        await this.KeepPage.goto(`${config.TEST_URL}`, {
            "timeout": 180000,
            "waitUntil": "domcontentloaded"
        });
    }

    async StartUpAndLogin() {
        await this.StartUp()
        await this.Login()
    }

    async FinaliseVideo() {
        if (this.VideoScenario == true) {
            console.log("FinaliseVideo called ..")
            await this.delay(5000)
            await DoIteration.capture.stop()
            console.log("FinaliseVideo called2 ..")

            await DoIteration.delayfixed(5000)
            console.log("this.KeepVideo is: " + this.KeepVideo)
            if (this.KeepVideo == 0) {
                const path = this.videodestination

                try {
                    fs.unlinkSync(path)
                    console.log("Video removed ...")
                } catch (err) {
                    console.log("Error removing video file " + err)

                }

            }
        }

    }
    
    async Finish() {
        
        this.StartTransaction("Closing The Browser after each Scenarion")

        await this.delay(2000)
        await this.KeepBrowser.close();
        this.EndTransaction("Closing The Browser after each Scenarion", "Pass")

        this.WriteLog("Closed ...");

    
    }
}

module.exports.Iteration = Iteration;
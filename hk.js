const puppeteer = require("puppeteer");
const codeObj = require('./codes');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "xyz777@gmail.com";
const password = "3334444"

let browserOpen = puppeteer.launch ({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null
})

let page;
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIdEntered = page.type("input[id = 'input-1']", email, {delay : 60});
    return emailIdEntered;
}).then(function(){
    let passwordEntered = page.type("input[id = 'input-2']", password, {delay : 60});
    return passwordEntered;
}).then(function(){
    let loginBtnClicked = page.click("button[data-analytics = 'LoginPassword']", {delay : 20});
    return loginBtnClicked;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1 = 'algorithms']", page);
    return clickOnAlgoPromise;
}).then (function(){
    let getToWarmup = waitAndClick('input[value="warmup"]', page);
    return getToWarmup;
}).then(function(){
    waitFor3Seconds.then(() => {
    }).then(function (){
        let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 50});
        return allChallengesPromise;
    }).then(function (questionArr){
        console.log('number of question', questionArr.length);
        let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0]);
        return questionWillBeSolved;
    })
})


  


function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)  
        // waitForSelector -> predefined
        waitForModelPromise.then(function (){
            let clickModal = cPage.click(selector)
            return clickModal;
        }).then (function(){
            resolve();
        }).then (function(err){
            reject();
        })
    })
}

let waitFor3Seconds = new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });


function questionSolver( page, question, answer){
    return new Promise(function(resolve, reject) {
        let questionWillBeChecked = question.click();
        questionWillBeChecked.then(function(){
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise;
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then( function (){
            return page.waitForSelector(".input.text-area.custominput.auto-width");
        }).then(function(){
            return page.type(".input.text-area.custominput.auto-width", answer, {delay: 10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A', {delay : 50})
            return AIsPressed
        }).then(function(){
            let XIsPressed = page.keyboard.press('X', {delay : 50})
            return XIsPressed
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.hr-monaco-base-editor', page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A', {delay : 50})
            return AIsPressed
        }).then(function(){
            let VIsPressed = page.keyboard.press('V', {delay : 50})
            return VIsPressed
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        })
    })
}



// function questionSolver(page, question, answer) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         // Click on the question to open it
//         await question.click();
  
//         // Wait for the editor to appear
//         await page.waitForSelector('.monaco-editor.no-user-select.vs');
  
//         // Click on the editor to focus it
//         await waitAndClick('.monaco-editor.no-user-select.vs', page);
  
//         // Check the checkbox
//         await waitAndClick('.checkbox-input', page);
  
//         // Wait for the text area to appear
//         await page.waitForSelector('.input.text-area.custominput.auto-width');
  
//         // Type the answer
//         await page.type('.input.text-area.custominput.auto-width', answer, { delay: 10 });
  
//         // Select all (Ctrl+A)
//         await page.keyboard.down('Control');
//         await page.keyboard.press('A');
//         await page.keyboard.up('Control');
  
//         // Cut (Ctrl+X)
//         await page.keyboard.down('Control');
//         await page.keyboard.press('X');
//         await page.keyboard.up('Control');
  
//         // Focus the main editor
//         await waitAndClick('.hr-monaco-base-editor', page);
  
//         // Select all in the main editor (Ctrl+A)
//         await page.keyboard.down('Control');
//         await page.keyboard.press('A');
//         await page.keyboard.up('Control');
  
//         // Paste (Ctrl+V)
//         await page.keyboard.down('Control');
//         await page.keyboard.press('V');
//         await page.keyboard.up('Control');
  
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     });
// }
  
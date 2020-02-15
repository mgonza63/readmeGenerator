const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "myProject",
        message: "What is the name of your Project?"
    }
    ,
    {
        type: "input",
        name: "myDescription",
        message: "Give a description of your Project"
    },
    // MISSING TABLE OF CONTENTS
    {
        type: "input",
        name: "myInstall",
        message: "What are the steps required to install your project?"
    },
    {   
        type: "input",
        name: "myInstructions",
        message: "Provide instructions and examples for use"
    },
    {
        type: "input",
        name: "myCollabs",
        message: "List collaborators and third-party assets"   
    },
    {
        type: "input",
        name: "myLicense",
        message: "What liscense did you use?"
    }];

    //.then(function(answer) {
    //     console.log(answer)

    // })

inquirer.prompt(questions).then(function (answer) { 
    console.log(answer); 
});

function generateREADME(answer) {
    return `# Your Project Title

    ${answer.myProject}

    ## Description 
    
    ${answer.myDescription}
    
    ## Table of Contents
    
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    
    
    ## Installation
    
    ${answer.myInstall}
    
    ## Usage 
    
    ${answer.myInstructions}
    
    ## Credits
    
    ${answer.myCollabs}
    
    ## License
    
    ${answer.Liscence}
    
    `
}

async function init() {
    console.log("hi")
    try {
      const answers = await promptUser();
  
      const md = generateREADME(answers);
  
      await writeFileAsync("goodREADME.md", md);
  
      console.log("Successfully wrote to index.html");
    } catch(err) {
      console.log(err);
    }
  }
  
  init();
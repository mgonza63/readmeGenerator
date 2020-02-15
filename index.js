const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "myGithub",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "myProject",
        message: "What is the name of your Project?"
    },
    {
        type: "input",
        name: "myDescription",
        message: "Give a description of your Project"
    },
    
    {
        type: "input",
        name: "myInstall",
        message: "What command should be run to install dependencies?",
        default: "npm i"
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
        type: "list",
        name: "myLicense",
        message: "What license did you use?",
        choices: ["MIT", "BSD", "GNU"]
    },
    {
        type: "input",
        name: "myTests",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "myContribution",
        message: "What does the user need to know about contributing to the repo?"  
    }
    
];

    //.then(function(answer) {
    //     console.log(answer)

    // })

function promptUser() {
    return inquirer.prompt(questions);
};

function generateREADME(answer) {
    return `# ${answer.myProject}

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
    
${answer.myLicense}

## Tests

${answer.myTests}

## Contributing

${answer.Contributions}

`
}

async function init() {
    console.log("Fill in the prompts to create the readme file:");

    try {
      const answers = await promptUser();
  
      const md = generateREADME(answers);
  
      await writeFileAsync("goodREADME.md", md);
  
      console.log("Successfully wrote to README.md");

    } catch(err) {
      console.log(err);
    }
  }
  
  init();
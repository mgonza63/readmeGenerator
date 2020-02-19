const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");


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

function generateREADME(answer, image, banner) {
    return `# ${answer.myProject}

##    
${banner}

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

${answer.myContribution}

![My Avatar](${image})

`
}
// ![My Avatar] (${avatar_url})




async function getImage(username){
    try {
        const queryUrl = "https://api.github.com/users/" + username;

        const response = await axios.get(queryUrl);
        const avatar_url = await response.data.avatar_url;
        
        console.log(avatar_url);
        
        return avatar_url

      } catch (error) {
        console.error(error);
      }
    

};
async function getBadge(license) {
    try {
        if (license === "MIT") {
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        };
        if (license === "BSD") {
            return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
        };

        if (license === "GNU") {
            return "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)"
        };

    }
    catch(error) {
        console.log(error)
    }
};

async function init() {
    console.log("Fill in the prompts to create the readme file:");

    try {
      const answers = await promptUser();

      const username = answers.myGithub;

      const image = await getImage(username);

      const license = answers.myLicense;

      const banner = await getBadge(license);

      const md = generateREADME(answers, image, banner);

      

      
      await writeFileAsync("goodREADME.md", md);
  
      console.log("Successfully wrote to README.md");

    } catch(err) {
      console.log(err);
    }
  }

  init();
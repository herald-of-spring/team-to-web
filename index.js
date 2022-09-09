const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./src/Engineer');
const Intern = require('./src/Intern');
const Manager = require('./src/Manager');

const isNumber = async(input) => /^\d+$/.test(input) ? true : "Entry must be a number.";
// checks if email is a string with 1 '@' and '.' symbol after
const isEmail = async(input) => (input.split("@").length == 2 && input.split("@")[1].split(".").length == 2) ? true : "Enter a valid email";
const noSpace = async(input) => input.split(" ").length == 1 ? true : "Entry must not contain spaces.";

//adds manager information
async function init() {
  var data = await inquirer.prompt([{
    type: "input",
    message: "Let's enter the team manager's information. What's the name?",
    name: "name",
  }, {
    type: "input",
    message: "What's the id?",
    name: "id",
    validate: isNumber,
  }, {
    type: "input",
    message: "What's the email address?",
    name: "email",
    validate: isEmail,
  }, {
    type: "input",
    message: "What's the office number?",
    name: "office",
    validate: isNumber,
  }]);
  manager = new Manager(data.name, data.id, data.email, data.office);
  await mainMenu();
}

//prompts engineer, then brings back to menu
async function promptEngineer() {
  var newEng = await inquirer.prompt([{
    type: "input",
    message: "Let's enter the engineer's information. What's the name?",
    name: "name",
  }, {
    type: "input",
    message: "What's the id?",
    name: "id",
    validate: isNumber,
  }, {
    type: "input",
    message: "What's the email address?",
    name: "email",
    validate: isEmail,
  }, {
    type: "input",
    message: "What's the GitHub username?",
    name: "github",
    validate: noSpace,
  }])
  engineers.push(new Engineer(newEng.name, newEng.id, newEng.email, newEng.github));
  await mainMenu();
}

//prompts intern, then brings back to menu
async function promptIntern() {
  var newInt = await inquirer.prompt([{
    type: "input",
    message: "Let's enter the intern's information. What's the name?",
    name: "name",
  }, {
    type: "input",
    message: "What's the id?",
    name: "id",
    validate: isNumber,
  }, {
    type: "input",
    message: "What's the email address?",
    name: "email",
    validate: isEmail,
  }, {
    type: "input",
    message: "What's the name of their school?",
    name: "school",
  }])
  interns.push(new Intern(newInt.name, newInt.id, newInt.email, newInt.school));
  await mainMenu();
}

//rotating menu
async function mainMenu() {
  const temp = await inquirer.prompt({
    type: "list",
    message: "Team Builder Menu:",
    name: "action",
    choices: ["Add Engineer", "Add Intern", "All done!"]
  })
  if (temp.action == "Add Engineer") {
    await promptEngineer();
  }
  else if (temp.action == "Add Intern") {
    await promptIntern();
  }
  else {
    await buildWebsite();
  }
}

//html formatting for all engineers
async function buildEngineers() {
  var res = "";
  for (e of engineers) {
    res += 
    `<div class="shadow rounded-lg col-3 m-3 p-0 simple-animate">
      <div class="bg-primary rounded-top" style="opacity: 0.8">
        <h3><b class="p-3">${e.getName()}</b></h3>
        <div class="pl-3 pb-2 h5"><i class="fa-solid fa-laptop-code"></i> Engineer</div>
      </div>
      <div class="text-dark">
        <div class="mx-3 mt-2">ID: ${e.getId()}</div>
        <div class="mx-3 my-1">Email: <a href="mailto:${e.getEmail()}">${e.getEmail()}</a></div>
        <div class="mx-3 mb-2">GitHub: <a href="https://github.com/${e.getGithub()}">${e.getGithub()}</a></div>
      </div>
    </div>\n`
  }
  return res;
}

//html formatting for all interns
async function buildInterns() {
  var res = "";
  for (i of interns) {
    res += 
    `<div class="shadow rounded-lg col-3 m-3 p-0 simple-animate">
      <div class="bg-success rounded-top" style="opacity: 0.8">
        <h3><b class="p-3">${i.getName()}</b></h3>
        <div class="pl-3 pb-2 h5"><i class="fa-solid fa-graduation-cap"></i> Intern</div>
      </div>
      <div class="text-dark">
        <div class="mx-3 mt-2">ID: ${i.getId()}</div>
        <div class="mx-3 my-1">Email: <a href="mailto:${i.getEmail()}">${i.getEmail()}</a></div>
        <div class="mx-3 mb-2">School: ${i.getSchool()}</div>
      </div>
    </div>\n`
  }
  return res;
}

//html formatting function
async function buildWebsite() {
  fs.writeFile("./dist/index.html", 
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/d07fe58864.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
    <style>
      .simple-animate {
        transition: all 0.3s ease-in-out;
      }
      
      .simple-animate:hover {
        opacity: 1;
        font-size: 110%;
      }
    </style>
    <title>${manager.getName()}'s Team</title>
  </head>
  <body class="bg-light text-light">
    <h1 class="text-dark text-center">Meet the Team</h1>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="shadow rounded-lg col-3 m-3 p-0 simple-animate">
        <div class="bg-danger rounded-top" style="opacity: 0.8">
          <h3><b class="p-3">${manager.getName()}</b></h3>
          <div class="pl-3 pb-2 h5"><i class="fa-solid fa-briefcase"></i> Manager</div>
        </div>
        <div class="text-dark">
          <div class="mx-3 mt-2">ID: ${manager.getId()}</div>
          <div class="mx-3 my-1">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></div>
          <div class="mx-3 mb-2">Office Number: ${manager.getOfficeNumber()}</div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      ${await buildEngineers()}
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      ${await buildInterns()}
    </div>
  </body>
  </html>`, 
  err => err ? console.error(err) : console.log("Webpage created. Check it out under /dist/index.html"));
}

var manager = undefined;
var engineers = []
var interns = []
init();
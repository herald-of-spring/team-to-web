const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./src/Engineer');
const Intern = require('./src/Intern');
const Manager = require('./src/Manager');

const isNumber = async(input) => /^\d+$/.test(input) ? true : "Entry must be a number.";
// checks if email is a string with 1 '@' and '.' symbol after
const isEmail = async(input) => (input.split("@").length == 2 && input.split("@")[1].split(".").length == 2) ? true : "Enter a valid email";
const noSpace = async(input) => input.split(" ").length == 1 ? true : "Entry must not contain spaces.";

const data = await inquirer.prompt([{
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
var manager = new Manager(data.name, data.id, data.email, data.office);

const mainMenu = async () => {
  const temp = await inquirer.prompt({
    type: "list",
    message: "Team Builder Menu:",
    name: "action",
    choices: ["Add Engineer", "Add Intern", "All done!"]
  })
  return temp.action;
}

const promptEngineer = async () => {
  return await inquirer.prompt([{
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
}

const promptIntern = async () => {
  return await inquirer.prompt([{
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
}

var engineers = []
var interns = []
var action = mainMenu();
while (action != "All done!") {
  if (action == "Add Engineer") {
    var newEng = promptEngineer();
    engineers.push(new Engineer(newEng.name, newEng.id, newEng.email, newEng.github));
  }
  else {
    var newInt = promptIntern();
    interns.push(new Intern(newInt.name, newInt.id, newInt.email, newInt.school));
  }
  action = mainMenu();
}

const buildEngineers = async () => {
  var res = "";
  for (e of engineers) {
    res += ``
  }
  return res;
}

const buildInterns = async () => {
  var res = "";
  for (i of interns) {
    res += ``
  }
  return res;
}

const buildWebsite = async (m, e, i) => {
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
  <body class="bg-dark text-light">
    <div class="d-flex min-vh-100 flex-column align-items-center">
      <div class="card rounded-lg col-3 m-3">
        <div class="bg-danger" style="opacity: 0.8">
          <h3><b class="p-3">${manager.getName()}</b></h3>
          <i class="fa-solid fa-briefcase pl-3 h5">Manager</i>
        </div>
        <div class"bg-light text-dark">
          
        </div>
      </div>
    </div>
    <div class="d-flex min-vh-100 flex-column align-items-center">
      ${buildEngineers()}
    </div>
    <div class="d-flex min-vh-100 flex-column align-items-center">
      ${buildInterns()}
    </div>
  </body>
  </html>`, 
  err => err ? console.error(err) : console.log("Webpage created. Check it out under /dist/index.html"));
}
buildWebsite(manager, engineers, interns);

<a href="mailto:email">
<i class="fa-solid fa-graduation-cap"></i>
<i class="fa-solid fa-laptop-code"></i>
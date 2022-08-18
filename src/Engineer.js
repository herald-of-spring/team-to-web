const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    if (typeof github != String) throw "GitHub username must be a string.";
    if (github.split(" ").length > 1) throw "GitHub usernames do not contain spaces.";
    super(name, id, email);
    this.github = github;
    this.role = "Engineer";
  }

  getGithub() {

  }
}

module.exports = Engineer;
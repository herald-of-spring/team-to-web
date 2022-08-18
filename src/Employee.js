class Employee {
  constructor(name, id, email) {
    if (typeof name != String) throw "Name must be a string.";
    if (typeof id != Number) throw "ID must be a number.";
    if (typeof email != String) throw "Email must be a string.";
    let valid = email.split("@");
    if (valid.length != 2 || valid[1].split(".").length != 2) throw "Enter a valid email.";    //contains 1 '@' and 1 '.' after that
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  }

  getName() {

  }

  getId() {

  }

  getEmail() {

  }

  getRole() {

  }
}

module.exports = Employee;
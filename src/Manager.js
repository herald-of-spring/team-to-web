const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    if (typeof officeNumber != Number) throw "Office number must be a number.";
    super(name, id, email)
    this.officeNumber = officeNumber;
    this.role = "Manager";
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Employee;
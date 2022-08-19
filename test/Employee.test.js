const Employee = require('../src/Employee');

describe("Employee class", () => {    //no input validation since covered by inquirer in index.js
  const employee1 = new Employee("John", 1, "john@test.com");
  const employee2 = new Employee("Jane", 10, "jane@test.com");
  describe("getName", () => {
    it("retrieves the name of the employee", () => {
      expect(employee1.getName()).toEqual("John");
      expect(employee2.getName()).toEqual("Jane");
    })
  })

  describe("getId", () => {
    it("retrieves the id of the employee", () => {
      expect(employee1.getId()).toEqual(1);
      expect(employee2.getId()).toEqual(10);
    })
  })

  describe("getEmail", () => {
    it("retrieves the email of the employee", () => {
      expect(employee1.getEmail()).toEqual("john@test.com");
      expect(employee2.getEmail()).toEqual("jane@test.com");
    })
  })

  describe("getRole", () => {
    it("retrieves the role of the employee", () => {
      expect(employee1.getRole()).toEqual("Employee");
      expect(employee2.getRole()).toEqual("Employee");
    })
  })
})
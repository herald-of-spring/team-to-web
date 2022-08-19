const Manager = require('../src/Manager');

describe ("Manager class", () => {
  const employee1 = new Manager("John", 1, "john@test.com", 218);
  const employee2 = new Manager("Jane", 10, "jane@test.com", 13);
  describe("getOfficeNumber", () => {
    it("retrieves office number of the manager", () => {
      expect(employee1.getOfficeNumber()).toEqual(218);
      expect(employee2.getOfficeNumber()).toEqual(13);
    })
  })

  describe("getRole", () => {
    it("retrieves the role of the manager", () => {
      expect(employee1.getRole()).toEqual("Manager");
      expect(employee2.getRole()).toEqual("Manager");
    })
  })
})
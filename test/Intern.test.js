const Intern = require('../src/Intern');

describe ("Intern class", () => {
  const employee1 = new Intern("John", 1, "john@test.com", "Zoom University");
  const employee2 = new Intern("Jane", 10, "jane@test.com", "EveRy College");
  describe("getSchool", () => {
    it("retrieves school name of the intern", () => {
      expect(employee1.getSchool()).toEqual("Zoom University");
      expect(employee2.getSchool()).toEqual("EveRy College");
    })
  })

  describe("getRole", () => {
    it("retrieves the role of the intern", () => {
      expect(employee1.getRole()).toEqual("Intern");
      expect(employee2.getRole()).toEqual("Intern");
    })
  })
})
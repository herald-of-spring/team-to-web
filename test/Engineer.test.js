const Engineer = require('../src/Engineer');

describe ("Engineer class", () => {
  const employee1 = new Engineer("John", 1, "john@test.com", "john-at-github");
  const employee2 = new Engineer("Jane", 10, "jane@test.com", "jane-at-github");
  describe("getGithub", () => {
    it("retrieves github username of the engineer", () => {
      expect(employee1.getGithub()).toEqual("john-at-github");
      expect(employee2.getGithub()).toEqual("jane-at-github");
    })
  })

  describe("getRole", () => {
    it("retrieves the role of the engineer", () => {
      expect(employee1.getRole()).toEqual("Engineer");
      expect(employee2.getRole()).toEqual("Engineer");
    })
  })
})
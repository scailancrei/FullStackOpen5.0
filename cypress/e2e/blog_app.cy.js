/// <reference types="Cypress" />

describe("Blogs app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173", { timeout: 10000 })
    //delete BDD of users and create a new one on each execution
    cy.request("DELETE", "http://localhost:3003/api/users")
    const user = {
      name: "Admin123",
      username: "Admin123",
      password: "Admin123",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
  })

  describe("Show login", () => {
    it("Open the login", function () {
      cy.contains("login").click()
    })
  })

  describe("Login form", () => {
    it("Login correctly", () => {
      cy.contains("login").click()
      cy.get("input").first().type("Admin123")
      cy.get("input").last().type("Admin123")
      cy.get("form").submit()
    })
    it("Login fails with wrong credentials", () => {
      cy.contains("login").click()
      cy.get("input").first().type("Admin")
      cy.get("input").last().type("Admin")
      cy.get("form").submit()
    })
  })

  describe("When is logged in", () => {
    beforeEach(function () {
      cy.contains("login").click()
      cy.get("input").first().type("Admin123")
      cy.get("input").last().type("Admin123")
      cy.get("form").submit()
    })

    describe("Show logout button", () => {
      it("close the session", () => {
        cy.contains("logOut").should("be.visible").click()
        cy.url().should("equal", "http://localhost:5173/")
      })
    })
    describe("Create blogs", () => {
      it("Click on create a new blog and show the blog form", () => {
        cy.contains("new blog").click()
        cy.get("form").should("be.visible")
      })
      it("Fill the form and submit a new blog", () => {
        cy.contains("new blog").click()
        cy.get("#title").type("The title is Cypress")
        cy.get("#author").type("The author is Juan")
        cy.get("#url").type("http://cypress.com")
        cy.get("form > button").click()
        cy.get(
          '[style="width: 20%; border: 3px solid green; background: rgb(211, 211, 211); padding: 10px; color: green; margin: 10px;"]'
        ).should("be.visible")
      })
    })
  })
})

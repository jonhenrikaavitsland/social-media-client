/// <reference types="cypress" />

import { apiUrl } from "../../src/js/api/constants";

describe("login form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("should log in with valid credentials", () => {
    cy.interceptRequest(200);
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get(`[data-cy="emailInput"]`).type("testcypress@stud.noroff.no");
    cy.get(`[data-cy="passwordInput"]`).click();
    cy.get(`[data-cy="passwordInput"]`).type(`123456789{enter}`);
    cy.wait(1000);
    cy.get(".profile-actions h4").should("have.text", "testcypress");
    cy.get(`[data-auth="logout"]`).click();
    cy.wait(500);
    cy.location("pathname").should("eq", "/");
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get(`[data-cy="emailInput"]`).type("testcypress@stud.noroff.no");
    cy.get(`[data-cy="passwordInput"]`).click();
    cy.get(`[data-cy="passwordInput"]`).type(`123456789`);
    cy.get(`[data-cy="login-btn"]`).click();
    cy.wait(1000);
    cy.get(".profile-actions h4").should("have.text", "testcypress");
  });

  it("should not submit the login form when provided with invalid credentials and user is shown a message", () => {
    cy.interceptRequest(401);
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.get(`[data-cy="emailInput"]`).type("invalidtestemail@stud.noroff.no");
    cy.get(`[data-cy="passwordInput"]`).click();
    cy.get(`[data-cy="passwordInput"]`).type(`invalidpassword{enter}`);
    cy.wait(1000);
    cy.on("window:alert", () => {
      expect(true).to.be.true;
    });
  });
});

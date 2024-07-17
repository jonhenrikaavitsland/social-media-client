describe("logout function", () => {
  it("should log the user out when clicking the logout button", () => {
    cy.visit("/");
    cy.wait(500);
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
  });
});

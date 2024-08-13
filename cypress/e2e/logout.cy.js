describe("logout function", () => {
  it("should log the user out when clicking the logout button", () => {
    cy.fixture("credentials.json").as("credentials");
    cy.interceptSuccess().as("loginReq");
    cy.visitPage();
    cy.get(`[data-cy="loginFormBtn"]`).click();
    cy.wait(500);
    cy.get(`[data-cy="emailInput"]`).click();
    cy.getCredentials();
    cy.wait("@loginReq");
    cy.window().its("localStorage.token").should("exist");
    cy.window().its("localStorage.profile").should("exist");
    cy.logoutFn();
  });
});

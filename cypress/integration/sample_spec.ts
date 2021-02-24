describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should render 7 links to job offers", () => {
    cy.get("[data-cy=all-offers] section").should("have.length", 7);
  });
  it("should change heart color when clicked", () => {
    cy.get("[data-cy=favorite-offer-1]")
      .click()
      .invoke("attr", "class")
      .should("contain", "red");
  });
});

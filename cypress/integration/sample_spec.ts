describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should render 7 links to job offers", () => {
    cy.get("[data-cy=all-offers] section").should("have.length", 7);
  });

  // Testing if css class is assigned after click
  it("should change heart color when clicked", () => {
    cy.get("[data-cy=favorite-offer-1]")
      .click()
      .invoke("attr", "class")
      .should("contain", "red");

    //TODO test if local storage has changed
  });
  // Testing onChange event of an input
  it("shold filter job offers after filtering by keywords", () => {
    cy.get("[data-cy=input]").type("Radiation");

    cy.get("[data-cy=all-offers] section").should("have.length", 1);
  });
  // Testing multiselect with dropdown
  it("should filter job offers after selecting a skill", () => {
    cy.get("[data-cy=skill-filter]").click();

    // dropdown should show up
    cy.get(".ant-select-dropdown").should("be.visible");

    cy.get(".ant-select-item").first().click();

    cy.get("[data-cy=all-offers] section").should("have.length", 1);
  });
});

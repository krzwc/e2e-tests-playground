describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should render 7 links to job offers", () => {
    cy.get("[data-cy=all-offers] section").should("have.length", 7);
  });

  // Testing if css class is assigned after click
  it.only("should change heart color when clicked and save to LS", () => {
    cy.clearLocalStorage("favoriteJobOffers");
    cy.get("[data-cy=favorite-offer-1]")
      .click()
      .invoke("attr", "class")
      .should("contain", "red")
      .should(() => {
        expect(localStorage.getItem("favoriteJobOffers")).to.eq('["1"]');
      });
  });
  // Testing onChange event of an input
  it("should filter job offers after filtering by keywords", () => {
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

  //Testing single select
  it("should filter job offers after selecting a specific location", () => {
    cy.get("[data-cy=location-filter]").trigger("mouseover");

    cy.get(".ant-dropdown").should("be.visible");

    cy.get(".ant-dropdown-menu").click();

    cy.get("[data-cy=all-offers] section").should("have.length", 1);
  });
});

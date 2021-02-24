describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should render 7 links to job offers", () => {
    cy.get(".styles_shortOffersContainer__31vwj section").should(
      "have.length",
      7
    );
  });
});

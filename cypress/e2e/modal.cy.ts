import {baseTestUrl} from "./urls"
describe("test modals", () => {
  it("open modals", () => {
    cy.visit(baseTestUrl);
    cy.get('[data-cy="ingItem_bun"]').first().click();
    cy.get("#react-modals").should("contain", "Детали ингредиента");
  });

  it("show details", () => {
    cy.visit(baseTestUrl);
    cy.get('[data-cy="ingItem_bun"]').first().click();
    cy.get("#react-modals")
      .should("contain", "Краторная булка N-200i")
      .should("contain", "Калории")
      .should("contain", "420")
      .should("contain", "Белки")
      .should("contain", "80")
      .should("contain", "Жиры")
      .should("contain", "24")
      .should("contain", "Углеводы")
      .should("contain", "53");
  });

  it("close modals", () => {
    cy.visit(baseTestUrl);
    cy.get('[data-cy="ingItem_bun"]').first().click();
    cy.get("#react-modals").should("contain", "Детали ингредиента");
    cy.get("#react-modals span").first().click();
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("closes modal on overlay click", () => {
    cy.visit(baseTestUrl);
    cy.get('[data-cy="ingItem_bun"]').first().click();
    cy.get("#react-modals").should("contain", "Детали ингредиента");
    cy.get("body").click(1, 1);
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

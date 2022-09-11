describe("drag and drop", () => {
  it("drag to constructor", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="ingItem_bun"]').first().trigger("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    cy.get('[data-cy="constructor"]').trigger("drop").trigger("dragend");
    cy.get('[data-cy="ingItem_sauce"]').first().trigger("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    cy.get('[data-cy="constructor"]').trigger("drop").trigger("dragend");
    cy.get('[data-cy="ingItem_main"]').first().trigger("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    cy.get('[data-cy="constructor"]').trigger("drop").trigger("dragend");

    expect(cy.get('[data-cy="constructor"]').contains("булка"));
    expect(cy.get('[data-cy="constructor"]').contains("Соус"));
    expect(cy.get('[data-cy="constructor"]').contains("Филе"));
  });
});

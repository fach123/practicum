import {baseTestUrl} from "./urls"
describe("service", () => {
  it("is available on localhost:3000", () => {
    cy.visit(baseTestUrl);
  });
});

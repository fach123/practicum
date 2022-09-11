import {baseTestUrl} from "./urls"
describe("order creator test", () => {
    it("login | drag to constructor | send order", () => {
        cy.visit(baseTestUrl+"/login");
        cy.get("input[type=email]").type("fach123@ya.ru");
        cy.get("input[type=password]").type("123");
        cy.get("button").contains("Войти").click();

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

        cy.get("button").contains("Оформить заказ").click();
        cy.get("#react-modals", { timeout: 20000 }).should(
            "contain",
            "Ваш заказ начали готовить"
        );
    });
});

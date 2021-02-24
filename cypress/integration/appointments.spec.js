describe("should book an interview", () => {
  it("should book an interview", () => {
    cy.visit("/");

    cy.get("")
      .click()
    
    cy.get('input')
      .type("Alon")

      

  });

  it("should edit an interview", () => {
    cy.visit("/");    
  });

  it("should cancel an interview", () => {
    cy.visit("/");    
  });
})
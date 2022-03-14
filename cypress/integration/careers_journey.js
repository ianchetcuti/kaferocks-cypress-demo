/// <reference types="cypress"/>

let TESTPARAMETERS = null;

describe('KafeRocks Careers Demo Journey', () => {

  before(() => {
    cy.fixture('data.json').then(($testParameters) => TESTPARAMETERS = $testParameters);
    cy.log('Loaded test parameters file')
  })

  it('Navigate to careeers and get the count of open positions', function () {

    cy.visit(TESTPARAMETERS.baseUrl)
    cy.get('#top-menu > #menu-item-540 > a').click()
    cy.get('.et_pb_text_2').click()
    cy.get('.dp-dfg-items').find('a').then((elem) => {
      const listingCount = Cypress.$(elem).length
      cy.log("There are " + listingCount + " open positions");
    })
  })

  it('Search for qa positions and get the count of open positions', function () {

    cy.get('.dp-dfg-search-input').type(TESTPARAMETERS.careerSearchTerm)
    cy.get('.et-pb-icon').click()
    cy.get('.et-fb-loader', { timeout: 10000 }).should('not.exist');
    cy.get('.dp-dfg-items').find('a').then((elem) => {
      const listingCount = Cypress.$(elem).length
      if (listingCount <= 1)
        cy.log("There is " + listingCount + " open QA position");
      else
        cy.log("There are " + listingCount + " open QA positions");
    })
  })
})
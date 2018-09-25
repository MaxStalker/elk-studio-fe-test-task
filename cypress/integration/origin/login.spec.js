const EMAIL = 'careers@elk-studios.com'
const PASSWORD = 'password'
describe('Login Page', () => {
  context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/')
    })
    it('email input should be present on page', () => {
      cy.get('[data-test=email').should('exist')
    })

    it('password input should be present on page', () => {
      cy.get('[data-test=password').should('exist')
    })

    it('login button should be present', () => {
      cy.get('#login').should('exist')
    })

    it('type email', () => {
      cy.get('input[data-test=email')
        .type(EMAIL)
        .should('have.value', EMAIL)
    })

    it('type password', () => {
      cy.get('input[data-test=password')
        .type(PASSWORD)
        .should('have.value', PASSWORD)
    })

    it('should display error message on wrong credentials', () => {
      // Alias the route to wait for its response
      cy.server()
      cy.route({
        metho: 'POST',
        url: 'https://papi-stage.contentmedia.eu/2.0/auth/authenticate',
      }).as('loginAction')

      cy.get('input[data-test=email]').type('test')
      cy.get('input[data-test=password]').type('test')
      cy.get('#login').click()

      cy.wait('@loginAction')
        .its('status')
        .should('eq', 403)

      cy.get('.error[data-test=form]').should(
        'contain',
        'Access forbidden: invalid username or password'
      )
    })
  })
})

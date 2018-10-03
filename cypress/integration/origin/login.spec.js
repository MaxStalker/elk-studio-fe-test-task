const EMAIL = 'careers@elk-studios.com'
const PASSWORD = 'password'
describe('Login Page', () => {
  context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/')
      cy.clearLocalStorage()
    })
    it('Elements should be on page', () => {
      cy.get('[data-test=email]').should('exist')
      cy.get('[data-test=password]').should('exist')
      cy.get('[data-test=btn-login]').should('exist')
    })

    it('typing should work', () => {
      cy.get('input[data-test=email]')
        .type(EMAIL)
        .should('have.value', EMAIL)

      cy.get('input[data-test=password]')
        .type(PASSWORD)
        .should('have.value', PASSWORD)
    })

    it('should login', () => {
      cy.get('input[data-test=email]').type(EMAIL)
      cy.get('input[data-test=password]').type(PASSWORD)
      cy.get('[data-test=btn-login]').click()

      cy.wait(1500)
      cy.url({ timeout: 3000 }).should('eq', 'http://localhost:1234/')
    })

    it('redirects unauthorized users', () => {
      cy.url().should('contains', '/login')
    })

    // TODO: Implement server/route routine instead of simple timeout
    it('should display error message on wrong credentials', () => {
      cy.get('input[data-test=email]').type('test')
      cy.get('input[data-test=password]').type('test')
      cy.get('[data-test=btn-login]').click()

      cy.wait(3000)

      cy.get('[data-test=form-error]').should(
        'contain',
        'Access forbidden: invalid username or password',
      )
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Toni H',
      username: 'tovialhi',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('.error').contains('wrong username or password')
    })
  })

})
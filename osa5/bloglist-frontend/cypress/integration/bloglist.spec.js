describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Developer',
      username: 'käyttäjä',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login from is shown', function() {
    cy.contains('Bloglist')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('käyttäjä')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Developer logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('käyttäjä')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Developer logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'käyttäjä', password: 'salasana' })
    })

    it('a new blog can be saved', function() {
      cy.contains('save new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('Test Cypress')
      cy.get('#url').type('cypress.net')
      cy.contains('add').click()
      cy.get('#blog').contains('a blog title created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.saveBlog({
          title: 'another cypress blog',
          author: 'Test Cypress',
          url: 'cypress.net'
        })
      })

      it('user who saved the blog can remove it', function () {
        cy.get('#blog').contains('another cypress blog')
          .parent().find('button').as('viewButton')
        cy.get('@viewButton').click()

        cy.get('#removeButton').click()
        cy.get('.success').should('contain', 'succesfully deleted the blog')
        cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.success').should('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'another cypress blog')
      })

      it('it has button to view whole info', function () {
        cy.get('#blog').contains('another cypress blog')
          .parent().find('button').as('viewButton')
        cy.get('@viewButton').should('contain', 'view')
      })

      it('when whole info is viewed, there is a like button', function() {
        cy.get('#blog').contains('another cypress blog')
          .parent().find('button').as('viewButton')
        cy.get('@viewButton').click()

        cy.get('#likes').should('contain', 'likes 0')

        cy.get('#likeButton').click()
        cy.get('#likes').should('contain', 'likes 1')

      })
    })

    describe('and several blogs are saved and have some likes', function () {
      beforeEach(function () {
        cy.saveBlog({
          title: 'cypress one',
          author: 'Test Cypress',
          url: 'cypress.net'
        })
        cy.saveBlog({
          title: 'cypress two',
          author: 'Test Cypress',
          url: 'cypress.net'
        })
        cy.saveBlog({
          title: 'cypress three',
          author: 'Test Cypress',
          url: 'cypress.net'
        })
        cy.get('#bloglist').children().contains('cypress two')
          .parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('#likeButton').click()
        cy.get('#likes').should('contain', 'likes 1')
        cy.get('#likeButton').click()
        cy.get('#likes').should('contain', 'likes 2')
        cy.get('#hideButton').click()
        cy.get('#bloglist').contains('cypress three')
          .parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('#likeButton').click()
        cy.get('#likes').should('contain', 'likes 1')
        cy.get('#hideButton').click()

      })

      it('blogs are shown in order based on likes', function () {
        cy.get('#bloglist').children().eq(0).children().should('contain', 'cypress two')
        cy.get('#bloglist').children().eq(1).children().should('contain', 'cypress three')
        cy.get('#bloglist').children().eq(2).children().should('contain', 'cypress one')


      })
    })
  })
})
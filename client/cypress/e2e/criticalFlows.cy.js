/// <reference types="cypress" />

describe('Critical User Flows', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/posts`, {
      statusCode: 200,
      body: [
        { id: '1', title: 'Existing', content: 'Hello world', category: 'general' },
      ],
    }).as('getPosts');

    cy.intercept('POST', `${Cypress.env('apiUrl')}/posts`, (req) => {
      if (!req.body.title) {
        req.reply({ statusCode: 400, body: { error: 'Title is required' } });
        return;
      }

      req.reply({
        statusCode: 201,
        body: { ...req.body, id: '2' },
      });
    }).as('createPost');
  });

  it('allows a user to create a post and see it listed', () => {
    cy.visit('/');
    cy.wait('@getPosts');

    cy.findByLabelText(/title/i).type('Cypress Post');
    cy.findByLabelText(/content/i).type('End-to-end testing content');
    cy.findByLabelText(/category/i).type('testing');
    cy.findByRole('button', { name: /create post/i }).click();

    cy.wait('@createPost').its('response.statusCode').should('eq', 201);
    cy.wait('@getPosts');
    cy.findByText(/cypress post/i).should('exist');
  });

  it('shows validation feedback for missing input', () => {
    cy.visit('/');
    cy.wait('@getPosts');

    cy.findByRole('button', { name: /create post/i }).click();
    cy.findAllByRole('alert').its('length').should('be.gte', 1);
  });
});


/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('funcionalidade: login', () =>{

    beforeEach(() => {
        cy.visit('minha-conta')
    });
    
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('Testudo.Test@teste.com')
        cy.get('#password').type('Teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main strong:nth-child(1)').should('be.visible');
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Test.Test@teste.com')
        cy.get('#password').type('Teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('Testudo.Test@teste.com')
        cy.get('#password').type('Teste@456')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail Testudo.Test@teste.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('#main strong:nth-child(1)').should('be.visible');
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then( dados =>{
            cy.get('#username').type(dados.usuario, {log: false})
            cy.get('#password').type(dados.senha,{log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('#main strong:nth-child(1)').should('be.visible');
        })

    });

    it('Deve fazer login com sucesso - Usando comandos personalizados', () => {
        cy.login('Testudo.Test@teste.com', 'Teste@123')
        cy.get('#main strong:nth-child(1)').should('be.visible');
    });
})
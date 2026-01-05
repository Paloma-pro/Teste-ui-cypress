class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.products > .row')
        .contains(nomeProduto)
        .click()

    }

    visitarProduto(nomeProduto) {
        //cy.visit(`produtos/${nomeProduto}`)

        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get('li.button-variable-item-' + tamanho).should('be.visible').click()    //Existem dois jeitos de colocar o parâmetro. Esse é o primeiro.
        cy.get(`.button-variable-item-${cor}`).click()           // E esse é o segundo.
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

    }
}

export default new ProdutosPage()
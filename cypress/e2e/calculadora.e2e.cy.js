// cypress/e2e/calculadora.e2e.cy.js
//
// Testes E2E: abre o navegador, preenche os campos
// e clica nos botões como um usuário real faria.
describe('Calculadora — Interface (E2E)', () => {
    beforeEach(() => {
        // Abre a página antes de cada teste
        // A baseUrl está configurada para http://localhost:5000
        cy.visit('/')
    })

    //Renderização inicial 
    describe('Renderização da página', () => {
        it('deve exibir o título Calculadora', () => {
            cy.get('h1').should('contain.text', 'Calculadora')
        })
        it('deve exibir os dois campos de entrada', () => {
            cy.get('#num1').should('be.visible')
            cy.get('#num2').should('be.visible')
        })
        it('deve exibir os quatro botões de operação', () => {
            cy.get('#btnSomar').should('contain.text', 'Somar')
            cy.get('#btnSubtrair').should('contain.text', 'Diminuir')
            cy.get('#btnMultiplicar').should('contain.text', 'Multiplicar')
            cy.get('#btnDividir').should('contain.text', 'Dividir')
        })
        it('deve exibir resultado inicial como --', () => {
            cy.get('#resultado').should('have.text', '--')
        })
    })

    //Operações corretas
    describe('Operações matemáticas', () => {
        // Helper: preenche os campos e clica em um botão
        function calcular(n1, n2, btnId) {
            cy.get('#num1').clear().type(String(n1))
            cy.get('#num2').clear().type(String(n2))
            cy.get(btnId).click()
        }
        it('soma 10 + 5 = 15', () => {
            calcular(10, 5, '#btnSomar')
            cy.get('#resultado').should('have.text', '15')
        })
        it('soma com números negativos: -3 + 7 = 4', () => {
            calcular(-3, 7, '#btnSomar')
            cy.get('#resultado').should('have.text', '4')
        })
        it('subtrai 20 - 8 = 12', () => {
            calcular(20, 8, '#btnSubtrair')
            cy.get('#resultado').should('have.text', '12')
        })
        it('subtração com resultado negativo: 3 - 10 = -7', () => {
            calcular(3, 10, '#btnSubtrair')
            cy.get('#resultado').should('have.text', '-7')
        })
        it('multiplica 6 x 7 = 42', () => {
            calcular(6, 7, '#btnMultiplicar')
            cy.get('#resultado').should('have.text', '42')
        })
        it('multiplicação por zero: 99 x 0 = 0', () => {
            calcular(99, 0, '#btnMultiplicar')
            cy.get('#resultado').should('have.text', '0')
        })
        it('divide 15 / 3 = 5', () => {
            calcular(15, 3, '#btnDividir')
            cy.get('#resultado').should('have.text', '5')
        })
        it('divisão com resultado decimal: 7 / 2 = 3.5', () => {
            calcular(7, 2, '#btnDividir')
            cy.get('#resultado').should('have.text', '3.5')
        })
    })
    //Casos de erro 
    describe('Tratamento de erros', () => {
        it('exibe erro ao dividir por zero', () => {
            cy.get('#num1').clear().type('10')
            cy.get('#num2').clear().type('0')
            cy.get('#btnDividir').click()
            cy.get('#resultado').should('have.text', 'Divisão por zero')
        })
        it('exibe erro ao somar com texto no campo 1', () => {
            // Força valor não-numérico via invoke (type não aceita letras em input[number])
            cy.get('#num1').invoke('val', 'abc')
            cy.get('#num2').clear().type('5')
            cy.get('#btnSomar').click()
            cy.get('#resultado').should('contain.text', 'inválida')
        })
        it('exibe erro ao operar com campo vazio', () => {
            cy.get('#num1').clear()
            cy.get('#num2').clear().type('10')
            cy.get('#btnSubtrair').click()
            cy.get('#resultado').should('contain.text', 'inválida')
        })
    })

    //Fluxo encadeado (simula usuário real)
    describe('Fluxo completo do usuário', () => {
        it('faz múltiplas operações em sequência', () => {
            // Soma
            cy.get('#num1').type('100')
            cy.get('#num2').type('50')
            cy.get('#btnSomar').click()
            cy.get('#resultado').should('have.text', '150')

            // Muda os valores e multiplica
            cy.get('#num1').clear().type('4')
            cy.get('#num2').clear().type('25')
            cy.get('#btnMultiplicar').click()
            cy.get('#resultado').should('have.text', '100')
            
            // Divide o resultado (verificação visual)
            cy.get('#num1').clear().type('100')
            cy.get('#num2').clear().type('4')
            cy.get('#btnDividir').click()
            cy.get('#resultado').should('have.text', '25')
        })
    })
})
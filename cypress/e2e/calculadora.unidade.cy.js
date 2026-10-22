// cypress/e2e/calculadora.unidade.cy.js
// Testes de UNIDADE: importamos o módulo diretamente
// e testamos as funções sem abrir o navegador.

const Calc = require('../../calc.js')
describe('Calculadora — lógica pura', () => {
    //  SOMAR
    describe('somar()', () => {
        it('soma dois números positivos', () => {
            expect(Calc.somar(3, 7)).to.equal(10)
        })
        it('soma número positivo com negativo', () => {
            expect(Calc.somar(10, -4)).to.equal(6)
        })
        it('soma dois decimais', () => {
            expect(Calc.somar(0.1, 0.2)).to.be.closeTo(0.3, 0.0001)
        })
        it('lança erro para entrada inválida', () => {
            expect(() => Calc.somar('abc', 2)).to.throw('Entrada inválida')
        })
    })

    //  SUBTRAIR 
    describe('subtrair()', () => {
        it('subtrai dois números', () => {
            expect(Calc.subtrair(10, 3)).to.equal(7)
        })
        it('resultado negativo', () => {
            expect(Calc.subtrair(3, 10)).to.equal(-7)
        })
        it('lança erro para entrada inválida', () => {
            expect(() => Calc.subtrair(5, null)).to.throw('Entrada inválida')
        })
    })

    //  MULTIPLICAR 
    describe('multiplicar()', () => {
        it('multiplica dois positivos', () => {
            expect(Calc.multiplicar(4, 5)).to.equal(20)
        })
        it('multiplicação por zero resulta em zero', () => {
            expect(Calc.multiplicar(99, 0)).to.equal(0)
        })
        it('multiplica dois negativos (resultado positivo)', () => {
            expect(Calc.multiplicar(-3, -4)).to.equal(12)
        })
    })

    //  DIVIDIR 
    describe('dividir()', () => {
        it('divide dois números exatos', () => {
            expect(Calc.dividir(10, 2)).to.equal(5)
        })
        it('retorna decimal na divisão inexata', () => {
            expect(Calc.dividir(7, 2)).to.equal(3.5)
        })
        it('lança erro de divisão por zero', () => {
            expect(() => Calc.dividir(10, 0)).to.throw('Divisão por zero')
        })
        it('lança erro para entrada inválida', () => {
            expect(() => Calc.dividir('x', 2)).to.throw('Entrada inválida')
        })
    })
})

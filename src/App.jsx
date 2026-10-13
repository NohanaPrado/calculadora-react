
import { useState } from 'react'
import './App.css'

function App() {
  const [numero1, setNumero1] = useState('')
  const [numero2, setNumero2] = useState('')
  const [operacao, setOperacao] = useState('+')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function calcular(event) {
    event.preventDefault()
    setErro('')
    setResultado(null)

    if (numero1.trim() === '' || numero2.trim() === '') {
      setErro('Digite os dois números para continuar.')
      return
    }

    const a = Number(numero1)
    const b = Number(numero2)
    let total

    switch (operacao) {
      case '+':
        total = a + b
        break
      case '-':
        total = a - b
        break
      case '*':
        total = a * b
        break
      case '/':
        if (b === 0) {
          setErro('Não é possível dividir por zero.')
          return
        }
        total = a / b
        break
      default:
        setErro('Selecione uma operação válida.')
        return
    }

    setResultado(total)
  }

  function limpar() {
    setNumero1('')
    setNumero2('')
    setOperacao('+')
    setResultado(null)
    setErro('')
  }

  return (
    <main className="pagina">
      <section className="calculadora">
        <div className="icone">✳</div>

        <p className="subtitulo">SIMPLES • RÁPIDA • PRÁTICA</p>
        <h1>Calculadora</h1>
        <p className="descricao">
          Faça suas contas com facilidade.
        </p>

        <form onSubmit={calcular}>
          <label htmlFor="numero1">Primeiro número</label>
          <input
            id="numero1"
            type="number"
            step="any"
            placeholder="Digite um número"
            value={numero1}
            onChange={(event) => setNumero1(event.target.value)}
          />

          <label htmlFor="numero2">Segundo número</label>
          <input
            id="numero2"
            type="number"
            step="any"
            placeholder="Digite outro número"
            value={numero2}
            onChange={(event) => setNumero2(event.target.value)}
          />

          <label>Escolha a operação</label>
          <div className="operacoes">
            {[
              { simbolo: '+', nome: 'Soma' },
              { simbolo: '-', nome: 'Subtração' },
              { simbolo: '*', nome: 'Multiplicação' },
              { simbolo: '/', nome: 'Divisão' },
            ].map((item) => (
              <button
                key={item.simbolo}
                type="button"
                title={item.nome}
                aria-label={item.nome}
                className={
                  operacao === item.simbolo ? 'operacao selecionada' : 'operacao'
                }
                onClick={() => setOperacao(item.simbolo)}
              >
                {item.simbolo === '*' ? '×' : item.simbolo === '/' ? '÷' : item.simbolo === '-' ? '−' : '+'}
              </button>
            ))}
          </div>

          <button className="botao-calcular" type="submit">
            Calcular resultado <span>→</span>
          </button>
        </form>

        {erro && (
          <div className="mensagem erro" role="alert">
            {erro}
          </div>
        )}

        {resultado !== null && !erro && (
          <div className="resultado">
            <p>RESULTADO</p>
            <strong>
              {Number(resultado.toPrecision(10)).toLocaleString('pt-BR')}
            </strong>
          </div>
        )}

        <button className="botao-limpar" type="button" onClick={limpar}>
          Limpar calculadora
        </button>

        <footer>Desenvolvida com React e useState</footer>
      </section>
    </main>
  )
}

export default App

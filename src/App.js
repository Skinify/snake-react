import React, {useState, useEffect} from 'react'
import mov from './config/mov'
import mapa from './config/mapa'

const App = () => {
  const [tempo, setTempo] = useState(0);
  const [posicao, setPosicao] = useState();
  const [posicaoAtual, setPosicaoAtual] = useState({
    X:0,
    Y:0,
  })
  const [direcao, setDirecao] = useState(mov.DIREITA.VALOR);

  const body = document.querySelector("body");

  useEffect(()=>{
    body.addEventListener("keyup", toggleCommand);
    const temporizador = setInterval(() => {
      setTempo(tempo => tempo + 1)
      andar();
    }, 250);
    return () => {
      clearInterval(temporizador)
      body.removeEventListener("keyup", toggleCommand);
    };
  }, [posicaoAtual])


  const toggleCommand = (e) =>{
    atualizarDirecao(e.keyCode)
  }

  const atualizarDirecao = (e) =>{
    if(mov.CIMA.PADRAO.includes(e)){
      setDirecao(mov.CIMA.VALOR);
    }
    else if(mov.BAIXO.PADRAO.includes(e)){
      setDirecao(mov.BAIXO.VALOR);
    }
    else if(mov.ESQUERDA.PADRAO.includes(e)){
      setDirecao(mov.ESQUERDA.VALOR);
    }
    else {
      setDirecao(mov.DIREITA.VALOR);
    }
  }
  
  const andar = () => {
    let novaPosicaoAtual = {...posicaoAtual};

    if(direcao === mov.CIMA.VALOR){
      novaPosicaoAtual.Y = novaPosicaoAtual.Y - mapa.TAMANHO_BLOCO 
    }

    if(direcao === mov.BAIXO.VALOR){
      novaPosicaoAtual.Y = novaPosicaoAtual.Y + mapa.TAMANHO_BLOCO 
    }

    if(direcao === mov.ESQUERDA.VALOR){
      novaPosicaoAtual.X = novaPosicaoAtual.X - mapa.TAMANHO_BLOCO 
    }

    if(direcao === mov.DIREITA.VALOR){
      novaPosicaoAtual.X = novaPosicaoAtual.X + mapa.TAMANHO_BLOCO
    }
    setPosicaoAtual(novaPosicaoAtual)
  }

  return (
    <div className="App">
      <a className="player" style={{position:"absolute",top:`${posicaoAtual.Y}px`,left:`${posicaoAtual.X}px`}}>x</a>
    </div>
  );
}

export default App;

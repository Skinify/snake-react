import React, {useState, useEffect} from 'react'
import mov from './config/mov'

const App = () => {

  const [posicao, setPosicao] = useState();
  const [posicaoAtual, setPosicaoAtual] = useState({
    X:0,
    Y:0,
  })
  const [direcao, setDirecao] = useState();

  useEffect(()=>{
    document.querySelector("body").addEventListener("keyup", toggleCommand);
  }, [])

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

  setInterval(() => {
    andar();
  }, 2000);
  
  const andar = () => {
    setPosicaoAtual({
      X:posicaoAtual.X + 20,
      Y:posicaoAtual.Y + 20
    })
  }

  return (
    <div className="App">
      <a className="player" style={{position:"absolute",top:`${posicaoAtual.Y}px`,left:`${posicaoAtual.X}px`}}>x</a>
    </div>
  );
}

export default App;

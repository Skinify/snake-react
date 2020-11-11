import React, {useState, useEffect} from 'react'
import mov from './config/mov'

const App = () => {

  const [posicao, setPosicao] = useState();
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

  return (
    <div className="App">
      <a>{direcao}</a>
    </div>
  );
}

export default App;

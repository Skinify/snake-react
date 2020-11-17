import React, {useState, useEffect} from 'react'
import mov from './config/mov'
import mapa from './config/mapa'
import inteiroAleatorio from '../src/helper/inteiroAleatorio'

const App = () => {
  const [tempo, setTempo] = useState(0);
  const [posicao, setPosicao] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState({
    X:0,
    Y:0,
  })
  const [direcao, setDirecao] = useState(mov.DIREITA.VALOR);

  const [comida,setComida] = useState({
    X:50,
    Y:120,
  });

  const body = document.querySelector("body");

  useEffect(()=>{
    body.addEventListener("keyup", toggleCommand);
    const temporizador = setInterval(() => {
      setTempo(tempo => tempo + 1)
      andar();
      moverRabo();
    }, 150);
    verificarColisao();
    return () => {
      clearInterval(temporizador)
      body.removeEventListener("keyup", toggleCommand);
    };
  }, [posicaoAtual,posicao])

  const toggleCommand = (e) =>{
    atualizarDirecao(e.keyCode)
  }

  const verificarColisao = () =>{
    if(posicaoAtual.X === comida.X){
      if(posicaoAtual.Y === comida.Y){
        comer();
        gerarComida();
      }
    }

    if(posicaoAtual.X == mapa.LARGURA || posicaoAtual.Y == mapa.ALTURA){
      console.log("morto")  
    }

    if(posicaoAtual.X < 0 || posicaoAtual.Y < 0){
      console.log("morto")  
    }

    posicao.forEach(pos => {
      if(pos.X === posicaoAtual.X && pos.Y === posicaoAtual.Y){
        
      }
    })
  }

  const comer = () =>{
    let novaPos = [...posicao]
    if(posicao.length > 0){
      novaPos.push({
        X:posicao[posicao.length - 1].X, 
        Y: posicao[posicao.length - 1].Y, 
      })
    }else{
      novaPos.push({
        X:posicaoAtual.X, 
        Y: posicaoAtual.Y
      })
    }

    setPosicao(novaPos)
  }

  const gerarComida = () => {
      let x = 0,y = 0;
    do{
      x = inteiroAleatorio(0,10) * 10
      y = inteiroAleatorio(0,10) * 10
      if((posicaoAtual.X !== x) || (posicaoAtual.Y !== y)){
        break;
      }
    }while(true)
    setComida({
      X: x,
      Y: y
    })
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

  const moverRabo = () => {
    if(posicao.length > 0){ 
      let novaPos = [];
      var cont = posicao.length;  
      while(true){
        if(cont == 1){
          novaPos[0] = {
            X: posicaoAtual.X,
            Y: posicaoAtual.Y
          }
          break;
        }else{
          novaPos[cont - 1] = {
            X: posicao[cont - 2].X,
            Y: posicao[cont - 2].Y
          }
        }
        cont--;
      }
      setPosicao(novaPos)
    }
  }

  return (
    <div className="App">
      <div className="mapa">
        <a className="player" style={{position:"absolute",top:`${posicaoAtual.Y}px`,left:`${posicaoAtual.X}px`}}>X</a>
        {posicao.map(e => {
          return(<a style={{position:"absolute",top:`${e.Y}px`,left:`${e.X}px`}}>X</a>)
        })}
        <a style={{position:"absolute",top:`${comida.Y}px`,left:`${comida.X}px`}}>B</a>
      </div>
    </div>
  );
}

export default App;

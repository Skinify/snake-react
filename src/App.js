import React, {useState, useEffect} from 'react'
import mov from './config/mov'
import mapa from './config/mapa'
import inteiroAleatorio from '../src/helper/inteiroAleatorio'

const App = () => {
  const [tempo, setTempo] = useState(0);
  const [posicao, setPosicao] = useState([]);
  const [continuar, setContinuar] = useState(true)
  const [posicaoAtual, setPosicaoAtual] = useState({
    X:0,
    Y:0,
  })
  const [direcao, setDirecao] = useState(mov.DIREITA.VALOR);

  const [comida,setComida] = useState({
    X: inteiroAleatorio(0,(mapa.LARGURA / 10)) * 10,
    Y: inteiroAleatorio(0,(mapa.ALTURA/ 10)) * 10
  });

  const body = document.querySelector("body");

  useEffect(()=>{
    if(continuar){
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
    }
  }, [posicaoAtual,posicao])

  const toggleCommand = (e) =>{
    atualizarDirecao(e.keyCode)
  }

  const finalizarJogo = () =>{
    alert("Voce perdeu")
    setContinuar(false)
  }

  const verificarColisao = () =>{
    if(posicaoAtual.X === comida.X){
      if(posicaoAtual.Y === comida.Y){
        comer();
        gerarComida();
      }
    }

    console.log(mapa.LARGURA)

    if(posicaoAtual.X == mapa.LARGURA || posicaoAtual.Y == mapa.ALTURA){
      finalizarJogo()
    }

    if(posicaoAtual.X < 0 || posicaoAtual.Y < 0){
      finalizarJogo() 
    }

    posicao.forEach(pos => {
      if(pos.X === posicaoAtual.X && pos.Y === posicaoAtual.Y){
        finalizarJogo()
      }
    })
  }

  const comer = () =>{
    let novaPosi = posicao.length > 0 ? {...posicao[posicao.length - 1]} : {...posicaoAtual}
    
    if(direcao === mov.CIMA.VALOR){
      novaPosi.Y += mapa.TAMANHO_BLOCO
    }

    if(direcao === mov.BAIXO.VALOR){
      novaPosi.Y -= mapa.TAMANHO_BLOCO
    }

    if(direcao === mov.ESQUERDA.VALOR){
      novaPosi.X += mapa.TAMANHO_BLOCO
    }

    if(direcao === mov.DIREITA.VALOR){
      novaPosi.X -= mapa.TAMANHO_BLOCO
    }

    setPosicao([...posicao, novaPosi])
  }

  const gerarComida = () => {
      let x = 0,y = 0;
    do{
      x = inteiroAleatorio(0,(mapa.LARGURA / 10)) * 10
      y = inteiroAleatorio(0,(mapa.ALTURA/ 10)) * 10
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
    <div className="App column y-center">
      <h1 id="titulo">JOGO DA COBRA REACT</h1>
      <div className="mapa" style={{height:`${mapa.ALTURA}px`,width:`${mapa.LARGURA}px`}}>
        <a className="player" style={{position:"absolute",top:`${posicaoAtual.Y}px`,left:`${posicaoAtual.X}px`}}>X</a>
        {posicao.map(e => {
          return(<a style={{position:"absolute",top:`${e.Y}px`,left:`${e.X}px`}}>X</a>)
        })}
        <a style={{position:"absolute",top:`${comida.Y}px`,left:`${comida.X}px`}}>B</a>
      </div>
      <div className="row space-between" id="placar">
        <a>Tempo: {tempo}</a>
        <a>Frutas: {posicao.length}</a>
      </div>
    </div>
  );
}

export default App;

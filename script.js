const html = document.querySelector('html')
const lista = document.querySelector('.app__card-list')
const bannerImg = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botaoPlayPause = document.querySelector('#start-pause')
const timer = document.querySelector('#timer')


let tempoDecorridoEmSegundos = 1500

lista.addEventListener('click', e=>{
  const target = e.target
  const contexto = target.dataset.contexto
  if (contexto){
    alteraContexto(target,contexto)
  }
})
tocaMusica()


function alteraContexto(btn, contexto){
  
  const botoes = document.querySelectorAll('.app__card-button')
  botoes.forEach(botao =>botao.classList.remove('active'))
  
  btn.classList.add('active')

  html.setAttribute('data-contexto', contexto)
  bannerImg.setAttribute('src', `/imagens/${contexto}.png`)

  switch (contexto){
    case "foco":
      tempoDecorridoEmSegundos = 1500
      mostrarTemporizador()
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`

      break;
      case "short":
        tempoDecorridoEmSegundos = 300
      mostrarTemporizador()
      titulo.innerHTML = `Que tal dar uma respirada?<br>
      <strong class="app__title-strong">Faça uma pausa curta.</strong>`
      break;

      case "long":
        tempoDecorridoEmSegundos = 900
      mostrarTemporizador()
      titulo.innerHTML = `Hora de voltar a superficie,<br>
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`
      break;

      default: 
      break;
  }
}

function start(){
  botaoPlay.addEventListener('click',)
}

function tocaMusica(){
  const musicaInput = document.querySelector('#alternar-musica')
  const musica = new Audio("./sons/luna-rise-part-one.mp3");
  musica.loop = true

  musicaInput.addEventListener('change',()=>{
    if (musica.paused) {
      
      musica.play();
    } else {
      musica.pause();
    }  } )

  }
//?//
let intervalId = null
const acabou = new Audio('./sons/beep.mp3')
const play = new Audio('./sons/play.wav')
const pause = new Audio('./sons/pause.mp3')


const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0){
    mostrarTemporizador()
    acabou.play()
    botaoPlayPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
      <span>Começar</span>`
      zerar()
      alert('Tempo finalizado!')
    }else{
      tempoDecorridoEmSegundos -= 1
    }
    mostrarTemporizador()
  }

botaoPlayPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if(intervalId){
    botaoPlayPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
      <span>Continuar</span>`
    zerar()
    pause.play()
    return
  }
  intervalId = setInterval(contagemRegressiva, 1000)
  play.play()
  botaoPlayPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
  <span>Pausar</span>`
}

function zerar() {
  clearInterval(intervalId) 
  intervalId = null
}


function mostrarTemporizador(){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  timer.innerHTML = `${tempoFormatado}`
}

mostrarTemporizador()

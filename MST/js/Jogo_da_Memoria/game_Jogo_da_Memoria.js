var first = true;
var grid = document.querySelector('.grid');
var spanPlayer = document.querySelector('.player');
var timer = document.querySelector('.timer');
var back_Tema = 'RM';

const botaoRM = document.getElementById("botaoRM");
botaoRM.addEventListener('click', (e)=>{
  e.preventDefault();
  changeTema('RM'); // Chama a função mode com o argumento 'RM'
});

const botaoHA = document.getElementById("botaoHA");
botaoHA.addEventListener('click', (e)=>{
  e.preventDefault();
  changeTema('HA'); // Chama a função mode com o argumento 'HA'
});

const botaoET = document.getElementById("botaoET");
botaoET.addEventListener('click', (e)=>{
  e.preventDefault();
  changeTema('ET'); // Chama a função mode com o argumento 'ET'
});

var opcao = 1;
var erro = 0;

var characters = [];

function changeTema(tema) {
  console.log(tema);
  if (tema == 'HA') {
    characters = [
      'CN1',
      'CN2',
      'CN3',
      'CN4',
      'CN5',
      'CN6',
      'CN7',
      'CN8',
      'CN9',
    ];
  } else if(tema == 'RM') {
    characters = [
      'beth',
      'jerry',
      'jessica',
      'morty',
      'pessoa-passaro',
      'pickle-rick',
      'rick',
      'summer',
      'meeseeks',
    ];
  } else if(tema == 'ET') {
    characters = [
      'ET1',
      'ET2',
      'ET3',
      'ET4',
      'ET5',
      'ET6',
      'ET7',
      'ET8',
      'ET9',
    ];
    
  }
  
  back_Tema = tema;
  
  // Limpa o grid antes de recarregar o jogo
  grid.innerHTML = '';
  loadGame();

  resetTimer(); // Reseta o timer quando o tema é alterado
}

var createElement = (tag, className) => {
  var element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

var checkEndGame = () => {
  var disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 18) {
    clearInterval(this.loop);
    var ok = confirm(`Parabéns, ${localStorage.getItem('player')}! Seu tempo foi de: ${timer.innerHTML} segundos!E você teve ${erro} erros!`);
    if(ok){
      location.reload();
    }
  }
}

var checkCards = () => {
  var firstCharacter = firstCard.getAttribute('data-character');
  var secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
    erro++;
  }

}

var revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

var createCard = (character) => {

  var card = createElement('div', 'card');
  var front = createElement('div', 'face front');
  var back = createElement('div', 'face back');
  
  back.style.backgroundImage = `url('../../img/Jogo_da_Memoria/back_${back_Tema}.png')`;  
  front.style.backgroundImage = `url('../../img/Jogo_da_Memoria/${character}.png')`;
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

var loadGame = () => {
  currentTime = 0;
  var duplicateCharacters = [...characters, ...characters];

  var shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    var card = createCard(character);
    grid.appendChild(card);
  });

  return false;
}

var timerInterval; // Variável para armazenar o intervalo do timer

function resetTimer() {
  clearInterval(loop); // Limpa o intervalo atual do timer
  timer.innerHTML = '00'; // Define o timer para 0
  startTimer();
}

var startTimer = () => {
  timer.innerHTML = '00'; // Define o timer para 0

  this.loop = setInterval(() => {
    var currentTime = + timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  changeTema('RM'); // Carrega o tema "RA" por padrão
}
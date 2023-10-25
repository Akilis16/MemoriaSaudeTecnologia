const currentPlayer = document.querySelector('.currentPlayer');

let selected;
let Player = 'X';
let isEndOfGame = false;

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];
  Player = 'X';

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${Player}`;

  document.querySelectorAll('.game button').forEach((item) => {
    item.innerHTML = '';
    item.addEventListener('click', newMove);
  });
}

init();

function clickRandomButton() {
  if (isEndOfGame) return;

  const emptyButtons = [...document.querySelectorAll('button[data-i]')].filter(
    (button) => button.innerHTML !== 'X' && button.innerHTML !== 'O'
  );
  const randomIndex = Math.floor(Math.random() * emptyButtons.length);
  emptyButtons[randomIndex].click();
}

function isFirstSquareChecked() {
  let emptyButtons = [...document.querySelectorAll('button[data-i]')].filter(
    (button) => button.innerHTML !== 'X' && button.innerHTML !== 'O'
  );

  if (emptyButtons.length === 8) {
    isEndOfGame = false;
  }
}

function newMove(e) {
  const index = e.target.getAttribute('data-i');
  e.target.innerHTML = Player;
  e.target.removeEventListener('click', newMove);
  selected[index] = Player;

  setTimeout(() => {
    check();
  }, [100]);

  Player = Player === 'X' ? 'O' : 'X';
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${Player}`;

  isFirstSquareChecked();

  if (Player === 'O') {
    setTimeout(clickRandomButton, 300);
  }
}

function check() {
  let PlayerLastMove = Player === 'X' ? 'O' : 'X';

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === PlayerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      isEndOfGame = true;
      alert("O JOGADOR '" + PlayerLastMove + "' GANHOU!");
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    isEndOfGame = true;
    alert('DEU EMPATE!');
    init();
    return;
  }
}
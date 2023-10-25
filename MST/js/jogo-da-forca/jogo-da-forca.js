//Referências do HTML
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
//Opções dos botões
let options = {
    frutas: [
        "Ameixa",
        "Acerola",
        "Banana",
        "Goiaba",
        "Caju",
        "Manga",
        "Melancia",
        "Morango",
        "Uva",
        "Laranja",
    ],
    animais: [
        "Coelho",
        "Rato",
        "Tigre",
        "Cachorro",
        "Gato",
        "Cobra",
        "Vaca",
        "Boi",
        "Golfinho",
        "Lagarta",
    ],
    paises: [
        "Brasil",
        "Argentina",
        "Holanda",
        "Paraguai",
        "Chile",
        "Alemannha",
        "Catar",
        "Espanha",
        "Irlanda",
        "Jamaica",
    ],
    cores: [
        "Amarelo",
        "Roxo",
        "Azul",
        "Verde",
        "Rosa",
        "Laranja",
        "Vermelho",
        "Bege",
        "Marrom",
        "Vinho",
    ],
};
//contador
let winCount = 0;
let count = 0;
let chosenWord = "";
// Escolher as opções
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Selecionar uma opção</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};
//Bloquear os botões após clicar em algum
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Desativar opções de botões
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //Desativar letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};
//Gerar palavra
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //  Destacar botão após clicar
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  // Ocultar letras inicialmente
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  //Escolher palavra aleatória
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  //Ocultar palavra por um traço
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  //Exibir cada elemento como "span"
  userInputSection.innerHTML = displayItem;
};
//Função inical, quando o usuário clica em novo jogo
const initializer = () => {
  winCount = 0;
  count = 0;
  //Apaga inicialmente todo o conteúdo, oculta as palavras e o botão "Novo Jogo"
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  //Cria botões das letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Dígitos de 65 a 91 que significa letras de A-Z
    button.innerText = String.fromCharCode(i);
    //Clicar no tema escolhido
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // Se a letra clicada corresponder a palavra, substitua o traço pela letra, se não contabilizar o erro 
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //Se a letra clicada fizer parte da palavra 
          if (char === button.innerText) {
            //Substituir traço pela letra
            dashes[index].innerText = char;
            //Incrementção
            winCount += 1;
            //Se winCount for igual ao comprimento da palavra
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Você ganhou!!</h2><p>A palavra era: <span>${chosenWord}</span></p>`;
              //Bloquear botões
              blocker();
            }
          }
        });
      } else {
        //Errar a jogada 
        count += 1;
        //Desenhar o corpo
        drawMan(count);
        //Contar 6, pois temos a cabeça, corpo, braço direito, esquerdo, perna direita e esquerda
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Você perdeu!!</h2><p>A palavra era: <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //Desabilitar botão clicado
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  //Limpar tela anterior e criar tela inical
  let { initialDrawing } = canvasCreator();
  //Função para desenhar o quadro 
  initialDrawing();
};
//Quadro
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  //Desenhar linhas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  //Tela inicial
  const initialDrawing = () => {
    //Tela transparente
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //Resultado final
    drawLine(10, 130, 130, 130);
    //Linha a esquerda
    drawLine(10, 10, 10, 131);
    //Linha superior
    drawLine(10, 10, 70, 10);
    //Linha pequena superior
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};
//Desenhando o corpo
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};
//Novo Jogo
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
(function () {
  let cardArr = [];
  let guessedCardArr = [];
  let firstCard = null;
  let secondCard = null;
  let gameContainer;
  let cardCount;
  const TIMEOUT = 300;
  const restartBtn = document.createElement('button');

  restartBtn.addEventListener('click', () => {
    restartGame(cardCount, gameContainer);
    restartBtn.classList.remove('restart-btn_visible');
  });

  function restartGame (count, container) {
    container.innerHTML = '';
    firstCard = null;
    secondCard = null;
    cardArr = [];
    guessedCardArr = [];
    startGame(count, container);

  }


  function createNumbersArray(count) {
    const arrOfNumbers = [];
    for (let i = 1; i <= count; i++) {
      arrOfNumbers.push(i);
      arrOfNumbers.push(i)
    }
    return arrOfNumbers;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // создание карточки для игры
  function createGameCard(value) {
    const card = document.createElement('div');
    const cardObj = {};
    cardObj.value = value;
    cardObj.isOpen = false;
    cardObj.isGuessed = false;
    cardObj.card = card;
    card.classList.add('card');
    card.textContent = value;
    cardArr.push(cardObj)

    card.addEventListener('click', () => {
      if (cardObj.isOpen == false && cardObj.isGuessed == false) {
        card.classList.add('card_open');
        cardObj.isOpen = true;
        if (firstCard == null) {
          firstCard = cardObj;
          console.log(firstCard)
        } else if (secondCard == null) {
          secondCard = cardObj;
          console.log(secondCard);
          if (firstCard.value === secondCard.value) {
            guessedCardArr.push(firstCard);
            firstCard.isGuessed = true;
            firstCard.card.classList.add('card_guessed');
            guessedCardArr.push(secondCard);
            secondCard.isGuessed = true;
            secondCard.card.classList.add('card_guessed');
            firstCard = null;
            secondCard = null
          } else {
            setTimeout(() => {
              firstCard.isOpen = false;
              firstCard.card.classList.remove('card_open');
              secondCard.isOpen = false;
              secondCard.card.classList.remove('card_open');
              firstCard = null;
              secondCard = null;
            }, TIMEOUT)
          }
        }
      }
      if (cardArr.length == guessedCardArr.length) {
        restartBtn.classList.add('restart-btn_visible')

      }


    });


    return {
      card,
      cardObj
    };

  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count, container) {
    cardCount = count;
    gameContainer = container;
    const gameArr = shuffle(createNumbersArray(cardCount));
    restartBtn.textContent = 'Играть еще раз';
    restartBtn.classList.add('restart-btn');
    gameContainer.append(restartBtn);


    for (const number of gameArr) {
      let gameCard = createGameCard(number)
      gameContainer.append(gameCard.card);
    }


  }

  startGame(8, document.querySelector('.game-container'));
}())


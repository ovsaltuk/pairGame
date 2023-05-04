(function () {
  let cardArr = [];
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

  function restartGame(count, container) {
    container.innerHTML = '';
    firstCard = null;
    secondCard = null;
    cardArr = [];
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

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startGame(count, container) {
    cardCount = count;
    gameContainer = container;
    const gameArr = shuffle(createNumbersArray(cardCount));
    restartBtn.textContent = 'Играть еще раз';
    restartBtn.classList.add('restart-btn');
    gameContainer.append(restartBtn);

    for (const number of gameArr) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = number;
      card.dataset.isOpen = 'false';
      card.dataset.isGuessed = 'false';

      card.addEventListener('click', () => {
        if (card.dataset.isOpen === 'false' && card.dataset.isGuessed === 'false') {
          card.classList.add('card_open');
          card.dataset.isOpen = 'true';

          if (firstCard === null) {
            firstCard = card;
          } else if (secondCard === null) {
            secondCard = card;
            if (firstCard.textContent === secondCard.textContent) {
              firstCard.dataset.isGuessed = 'true';
              firstCard.classList.add('card_guessed');
              secondCard.dataset.isGuessed = 'true';
              secondCard.classList.add('card_guessed');
              firstCard = null;
              secondCard = null;
            } else {
              setTimeout(() => {
                firstCard.classList.remove('card_open');
                firstCard.dataset.isOpen = 'false';
                secondCard.classList.remove('card_open');
                secondCard.dataset.isOpen = 'false';
                firstCard = null;
                secondCard = null;
              }, TIMEOUT);
            }
          }
        }

        if (cardArr.every(card => card.dataset.isGuessed === 'true')) {
          restartBtn.classList.add('restart-btn_visible');
        }
      });

      cardArr.push(card);
      gameContainer.append(card);
    }
  }

  startGame(8, document.querySelector('.game-container'));
}());
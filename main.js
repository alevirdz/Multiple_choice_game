//Inizialite Always
let countQuestion = 0;
let result = 0;
//Div's
let divCardPresentation = document.getElementById('card-presentation')
let divCardGame = document.getElementById('game')
let divTemplate = document.getElementById('plantilla');
let divFinishCard = document.getElementById('finish');

let contentCards = {
  cardPresentation: {
    action: new Events(divCardPresentation),
  },
  divCardGame: {
    action: new Events(divCardGame),
  },
  divFinishCard: {
    action: new Events(divFinishCard),
  }
}

let animation = {
  defaultInPut: 'animate__rotateInDownLeft',
  defaultOutPut: 'animate__zoomOutDown',
}

const buttonStart = document.getElementById('start');
buttonStart.addEventListener('click', () => startGame());

const startGame = () => {
  loadQuestions();
  generateQuestion();
  contentCards.cardPresentation.action.hide();

}

const loadQuestions = () => {
  for (let index = 0; index < questions.length; index++) {
    let package = questions[index];
    questionTemplate(index + 1, package);
  }
}

const questionTemplate = (index, package) => {
  contentCards.divCardGame.action.show();
  divTemplate.innerHTML += `
  <div class="container d-none question-${index} animate__animated ${animation.defaultInPut}">
    <div class="card-auto card-width-auto">
      <div class="card-content text-center">
        <p class="title-card mt-1">Pregunta: ${index}</p>
        <div class="content"><p class="subtitle-card">${package.question}</p>
          <div class="item-button">
          <ul class="group-list">
                ${package.answers
                  .map(
                    (answers, dent) =>
                      `<li class="options">  <button class="button options-answers list_${index} key_${index}_${dent}" id="${dent}">${answers}</button></li>`
                  )
                  .join('')}
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}


const generateQuestion = () => {
  countQuestion += 1
  if (countQuestion > 1) {
    setTimeout(() => {
      let currentQuestion = new Events(document.querySelector('.question-' + (countQuestion - 1)));
      currentQuestion.hide();
    }, 1000);
  };

  let currentQuestion = new Events(document.querySelector('.question-' + countQuestion));
  currentQuestion.show();
  userChoose();
}

const userChoose = () => {
  document.querySelectorAll('button.list_' + countQuestion).forEach((element) => {
    element.addEventListener('click', (e) => {
      let getChoseAnswer = element.id
      let correctAnswer = questions[countQuestion - 1].answer;
      let showCorrectAnswer = new Events(document.querySelector('.key_' + countQuestion + '_' + correctAnswer));
      let currentQuestionNumber = document.querySelector('.question-' + countQuestion)

      if (parseInt(getChoseAnswer) === correctAnswer) {
        showCorrectAnswer.true()
        result += 1; 
        setTimeout(() => {
          currentQuestionNumber.classList.remove(animation.defaultInPut);
          currentQuestionNumber.classList.add(animation.defaultOutPut)
        }, 1000)
        
      } else {
        showCorrectAnswer.true()
        currentQuestionNumber.classList.remove(animation.defaultInPut);
        setTimeout(() => {
          currentQuestionNumber.classList.add(animation.defaultOutPut)
        }, 1000)
          
      }
      
      countQuestion === questions.length ?  finish() :  next();

    })
  })
};


const next = () => {
  divCardGame.classList.remove(animation.defaultInPut)
  divCardGame.classList.add(animation.defaultOutPut)
  setTimeout(() => generateQuestion(), 1000)
}

const finish = () => {
  let divResult = document.getElementById('results');
  divResult.innerHTML = result +'/'+ countQuestion
  divCardGame.classList.remove(animation.defaultInPut)
  divCardGame.classList.add(animation.defaultOutPut)

  setTimeout(() => {
    contentCards.divCardGame.action.hide();
    contentCards.divFinishCard.action.show();
  }, 2000)

  document.getElementById('restart').addEventListener('click', () => {
    contentCards.divFinishCard.action.hide();
    contentCards.divCardGame.action.show();
    countQuestion = 0;
    result = 0;
    resetGame();
    
  });

};

const resetGame = () => {
  divTemplate.innerHTML= ''
  startGame()
  
};
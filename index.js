'use strict';

//Questions and answers
const QUIZ = [
  {
    img: "https://bit.ly/2FLJmgB",
    question: "It's severe storm season in the U.S.  What is the area with the black border generally called?",
    answers: ["Super storm zone","Fly over country","Tornado Alley","Wind tunnel zone"],
    answerKey: 2
  },
  {
    img: "https://bit.ly/2jyRGYo",
    question: "On average, how many tornadoes occur in the U.S. each year?",
    answers: ["3417 tornadoes", "516 tornadoes", "10531 tornadoes", "1253 tornadoes"],
    answerKey: 3
  },
  {
    img: "https://bit.ly/2HXfsrw",
    question: "What scale measures the wind speed of a tornado?",
    answers: ["Simple scale", "Wind scale", "Enhanced Fujita Scale", "Tornado scale system"],
    answerKey: 2
  },
  {
    img: "https://bit.ly/2JVbOPn",
    question: "On August 25th, 1814 who was driven out of Washington D.C. by a tornado?",
    answers: ["George Washington", "The British", "The French", "Bob & Tom"],
    answerKey: 1
  },
  {
    img: "https://bit.ly/2JWfEIh",
    question: "April 25th, 26th, 27th and 28th of 2011 is the largest tornado outbreak over a 4-day timespan.  How many tornadoes were recorded?",
    answers: ["88 tornadoes", "129 tornadoes", "355 tornadoes", "853 tornadoes"],
    answerKey: 2
  },
  {
    img: "https://bit.ly/2JWvPFn",
    question: "EF5 classified tornadoes are the most violent and destructive, how many have been documented since 1950?",
    answers: ["59 tornadoes","17 tornadoes","147 tornadoes","210 tornadoes"],
    answerKey: 0
  },
  {
    img: "https://bit.ly/2KESt67",
    question: "Since 1950 Oklahoma leads the country in EF4 or stronger tornadoes.  How many have received that classification?",
    answers: ["153 tornadoes","16 tornadoes","224 tornadoes","65 tornadoes"],
    answerKey: 3
  },
  {
    img: "https://bit.ly/2roEBnM",
    question: "How many U.S. states have never experienced a tornado?",
    answers: ["4 states","0 states","11 states","2 states"],
    answerKey: 1
  },
  {
    img: "https://bit.ly/2wcOASM",
    question: "How many tornadoes have struck Alaska since 1950?",
    answers: ["1 tornado", "33 tornadoes", "57 tornadoes", "4 tornadoes"],
    answerKey: 3
  },
  {
    img: "https://bit.ly/2IkO6PH",
    question: "The deadliest single tornado in U.S. history was what?",
    answers: ["The Red River twister of 1922","The Crystal Lake cyclone of 1980","The Tri-State Tornado of 1925","The Joplin tornado of 2011"],
    answerKey: 2
  }
];

//score board for user score counts
const score = {
  qIdx: 0,
  correct: 0,
  incorrect: 0
};


//start page
function clickToContinue() {
  $(document).unbind().submit(function(event)   {
    event.preventDefault();

    $('#js-continue').hide();
    $('.js-scoreContainer, .js-quizAppQs, .js-answerButtonContainer').removeClass('hidden');

    scoreDisplay();
  });
}

//render score board for user
function scoreDisplay()  {
  $('.js-scoreContainer').html(
    `<span class="score numQuestions js-numQuestions">
    Question: ${score.qIdx+1}/${QUIZ.length}
    </span>
    <br>
    <span class="score numCorrect js-numCorrect">
    Correct: ${score.correct}
    </span>
    <span class="score numWrong js-numWrong">
    Incorrect: ${score.incorrect}
    </span>`
  );

  questions();
}

//render questions for user
function questions()  {
  $('.js-quizAppPic').html(
    `<img class="quizAppImg js-quizAppImg" src="${QUIZ[score.qIdx].img}" alt='question image'/>
     <div class="clearfix"></div>`
  );
  $('.js-quizAppQs').html(
    `<div class="theQuestion js-theQuestion">
    <span class='noHover'> ${QUIZ[score.qIdx].question} </span></div>`
  );

  let answerContents = QUIZ[score.qIdx].answers.map(function(answer, index) {
    return (
      `<span class="onHover"><input type="radio" id="${answer}" name="answer" value="${index}"
        class="cols-3 mt20 answer js-answer" role="radio" required>
      <label for="${answer}"> ${answer} </label></span>
      <br>`
    );
  });

  answerContents.push(`<button type="submit"  class="cols-3 mt20 submit js-submit">Submit answer</button>`);

  $('.js-answerButtonContainer').html(answerContents);

  quizApp();
}

//listen for submit of answer from user
function quizApp(answerContents)  {
  $(document).unbind().submit(function(event)  {
    event.preventDefault();

    let userAnswer = $('input[name=answer]:checked').val();
    let userAnswerNum = parseInt(userAnswer);
    let correctAnswer = QUIZ[score.qIdx].answerKey;
    let isCorrect = (userAnswerNum === correctAnswer);
    let answerContent = QUIZ[score.qIdx].answers[QUIZ[score.qIdx].answerKey];
    let userAnswerContent = QUIZ[score.qIdx].answers[userAnswerNum];

    $('#js-continue').show();
    $('.js-scoreContainer, .js-quizAppQs, .js-answerButtonContainer').toggleClass('hidden');

    //If answered correctly will show success message and update score variables
    if (isCorrect)  {
      $('.js-quizAppPic').html(
        `<span class="score">You selected \'${userAnswerContent}\' and that is the correct answer!</span>`
      );
      score.correct++;
    }
    else {
      $('.js-quizAppPic').html(
        `<span class="score">You selected \'${userAnswerContent}\',
          that is not the correct answer!</span>
        <br>
        <span>\'${answerContent}\' is the correct answer.</span>`
      );
      score.incorrect++;
    };
    quizStatusCheck();
  });
}

//Check if user is complete with quiz
function quizStatusCheck()  {
  let completed = (score.qIdx+1 === QUIZ.length);

  if (completed) {
    $(document).unbind().submit(function(event)  {
      event.preventDefault();
      quizComplete();
    });
  }
  else {
    score.qIdx++
    clickToContinue();
  };
}

//If quiz is complete
function quizComplete() {
  let totalCorrect = score.correct;
  let totalIncorrect = score.incorrect;
  let totalQuestions = QUIZ.length;

  if (totalCorrect > totalIncorrect)  {
    $('.js-quizAppPic').html(
      `<img class="quizAppImg js-quizAppImg" src="https://bit.ly/2HUDpna" alt='success image' />
      <br>
      <span>You did great!</span>
      <br>
      <span>${totalCorrect} out of ${totalQuestions} questions correct!</span>
      <br>
      <span>Click below to try again</span> </span>`
    );
  }

  else {
    $('.js-quizAppPic').html(
      `<img class="quizAppImg js-quizAppImg" src="https://bit.ly/2jyijN3" alt='try again image'/>
      <span>You'll do better next time!</span>
      <br>
      <span>${totalCorrect} out of ${totalQuestions} questions correct!</span>
      <br>
      <br>
      <span>Click below to try again</span>`
    );
  };
  freshStart();
}

//If user wants to do the quiz again
function freshStart() {
  score.qIdx = 0;
  score.correct = 0;
  score.incorrect = 0;
  clickToContinue();
}

$(clickToContinue);

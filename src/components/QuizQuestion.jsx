import { useState } from 'react';

import Timer from './Timer.jsx';
import Answers from './Answers.jsx';
import classes from './QuizQuestion.module.css';


export default function QuizQuestion({
  timerVal,
  question,
  onNotAnswered,
  handleAnswerClick,
}) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  const TIME_TO_NEXT_QUESTION = 2000;
const TIME_TO_REVEAL_ANSWER = 1000;
const SKIP_TIME = 0;

  // initial val from user's choice or default
  let timerDuration = timerVal;
  let answerState = '';

  // if user has clicked an answer, shorten the timer to move along
  if (userAnswer.selectedAnswer) {
    timerDuration = TIME_TO_REVEAL_ANSWER; // matches first setTimeout timer
  }

  // answer's been evaluated:
  if (userAnswer.isCorrect !== null) {
    timerDuration = TIME_TO_NEXT_QUESTION; // matches nested setTimeout timer
  }

  function handleSelectUserAnswer(answer) {
    setUserAnswer({
      selectedAnswer: answer, // immediate
      isCorrect: null, // settimeout fun
    });

    setTimeout(() => {
      // first determine if right or wrong but ...
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: question.answers[0] === answer,
      });
      // pause pause pause the 1000 for a delay before showing if it's right or wrong

      
      setTimeout(() => {
        handleAnswerClick(answer);
      }, TIME_TO_NEXT_QUESTION);
      // wait another second (2000-1000) to trigger the fn to add ans to ans array and move on. 
    }, TIME_TO_REVEAL_ANSWER);
  }

  function handleSkipQuestion(){
    setUserAnswer({
      selectedAnswer: null, 
      isCorrect: null, 
    });
      setTimeout(() => {
        handleAnswerClick(null);
      }, TIME_TO_NEXT_QUESTION);
  }

  if (userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answerState = userAnswer.isCorrect ? 'correct' : 'incorrect';
  } else if (userAnswer.selectedAnswer) {
    answerState = 'answered'; // FIX THIS STYLING
  }

  const timed = timerVal !== 0;

  // use a key to yeet and render new
  // and  fire onNotanswered IFF there's no answer. 
  const quizTimer = (
    <Timer
      key={timerDuration}
      duration={timerDuration}
      onTimesUp={userAnswer.selectedAnswer === '' ? onNotAnswered : null}
      answerState={answerState}
    />
  );
  const quizImage = (
    <div className={classes.questionImage}>
      <img src={question.image} alt={question.imageAlt} />
    </div>
  );
  return (
    <div className={classes.quizQuestionContainer}>
      <div className={classes.quizQuestionIntro}>
        {timed && <div className={classes.timer}> {quizTimer} </div>}
        <div className={classes.quizQuestion}>
          {question.image && quizImage}
          <h2>{question.question}</h2>
        </div>
      </div>

      <Answers
        answerOptions={question.answers}
        onSelect={handleSelectUserAnswer}
        onSkip={handleSkipQuestion}
        answerState={answerState}
        addSkip={timerDuration === 0}
        selectedAnswer={userAnswer.selectedAnswer}
      />
    </div>
  );
}

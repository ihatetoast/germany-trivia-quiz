import { useState } from 'react';

import Timer from './Timer.jsx';
import Answers from './Answers.jsx';

import TOPICS from '../topics.js';

export default function QuizQuestion({
  idx,
  onNotAnswered,
  handleAnswerClick,
}) {
  // setQuiz later. currently set to first set (states) on quiz page
  // just hard code it here as it'd be passed down. for now
  const quiz = TOPICS[0].questions;

  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timerDuration = 10000;
  let answerState = '';

  // if user has clicked an answer, shorten the timer to move along
  if (userAnswer.selectedAnswer) {
    timerDuration = 1000; // matches first setTimeout timer
  }

  // answer's been evaluated:
  if (userAnswer.isCorrect !== null) {
    timerDuration = 2000; // matches nested setTimeout timer
  }

  function handleSelectUserAnswer(answer) {
    setUserAnswer({
      selectedAnswer: answer, // immediate
      isCorrect: null,
    });

    // give parent timeout 1 sec to show selected
    // an then another sec to show right/wrong via style (total 2 sec)
    // timers only for styling. reason for that is we want to give
    // the user the results before next question instead of at the end.
    // todo: add a style to the right answer if user was wrong. 
    setTimeout(() => {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: quiz[idx].answers[0] === answer,
      });
      setTimeout(() => {
        handleAnswerClick(answer);
      }, 2000);
    }, 1000);
  }

  if(userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answerState = userAnswer.isCorrect ? 'correct' : 'incorrect';
  } else if( userAnswer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id='quiz-question'>
      <Timer 
      key={timerDuration}
      duration={timerDuration} 
      onTimesUp={userAnswer.selectedAnswer === '' ? onNotAnswered : null} 
      answerState={answerState}
      />
      <h2>{quiz[idx].question}</h2>
      <Answers
        answerOptions={quiz[idx].answers}
        onSelect={handleSelectUserAnswer}
        answerState={answerState}
        selectedAnswer={userAnswer.selectedAnswer}
      />
    </div>
  );
}


/**
 * take a break to style a bit.
 * since you want to make some test-specific style options
 * first up: module these suckers
 * ideas for right wrong an after a richtig/ja oder falsh/nein as
 * pseudoselector. 
 */
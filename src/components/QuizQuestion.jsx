import { useState } from 'react';

import Timer from './Timer.jsx';
import Answers from './Answers.jsx';

import classes from './QuizQuestion.module.css';

export default function QuizQuestion({
  idx,
  timerVal,
  question,
  onNotAnswered,
  handleAnswerClick,
}) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timerDuration = timerVal;
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
    // timers only for styling.  is we want to give
    // the user the results before next question instead of at the end.
    setTimeout(() => {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: question.answers[0] === answer,
      });
      setTimeout(() => {
        handleAnswerClick(answer);
      }, 2000);
    }, 1000);
  }

  if (userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answerState = userAnswer.isCorrect ? 'correct' : 'incorrect';
  } else if (userAnswer.selectedAnswer) {
    answerState = 'answered';
  }

  const timed = timerVal !== 0;

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
    <div className='quiz-question-container'>
      <div className='quiz-question-intro'>
        <div className='timer-div'>{timed && quizTimer}</div>
        <div className='quiz-question'>
          {question.image && quizImage}
          <h2>{question.question}</h2>
        </div>
      </div>

      <Answers
        answerOptions={question.answers}
        onSelect={handleSelectUserAnswer}
        answerState={answerState}
        selectedAnswer={userAnswer.selectedAnswer}
      />
    </div>
  );
}

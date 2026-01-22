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

  const [answerState, setAnswerState] = useState('');

  const TIME_TO_NEXT_QUESTION = 2000;
  const TIME_TO_REVEAL_ANSWER = 1000;

  // initial val from user's choice or default
  let timerDuration = timerVal;

  // if user has clicked an answer, shorten the timer to move along
  if (userAnswer.selectedAnswer) {
    timerDuration = TIME_TO_REVEAL_ANSWER; // matches first setTimeout timer
  }

  // answer's been evaluated:
  if (userAnswer.isCorrect !== null) {
    timerDuration = TIME_TO_NEXT_QUESTION; // matches nested setTimeout timer
  }

  function handleSelectUserAnswer(answer) {
    setAnswerState('answered');

    if (answer === null) {
      // skipped or waiting too long
      setUserAnswer({
        selectedAnswer: null,
        isCorrect: null,
      });
      handleAnswerClick(answer);
    } else {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: null,
      });

      setTimeout(() => {
        const isCorrect = question.answers[0] === answer;
        setUserAnswer({
          selectedAnswer: answer,
          isCorrect: isCorrect,
        });
        setAnswerState(isCorrect ? 'correct' : 'incorrect');
        setTimeout(() => {
          handleAnswerClick(answer);
        }, TIME_TO_NEXT_QUESTION);
      }, TIME_TO_REVEAL_ANSWER);
    }
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
  const quizImage = question.image ? (
    <div className={classes.questionImage}>
      <img src={question.image} alt={question.imageAlt} />
    </div>
  ) : null;
// note for a11y knowledge aria-live="polite" announces updates to dynamic comps
  return (
    <div className={classes.quizQuestionContainer} aria-live="polite">
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
        answerState={answerState}
        addSkip={timerDuration === 0}
        selectedAnswer={userAnswer.selectedAnswer}
      />
    </div>
  );
}

import { useRef } from 'react';
import classes from './Answers.module.css';
import Button from '../ui/Button.jsx';
import Card from '../ui/Card.jsx';
export default function Answers({
  answerOptions,
  selectedAnswer,
  answerState,
  onSelect,
  addSkip,
}) {
  // don't shuffle again when state changes
  const shuffledAnswerOptions = useRef();

  if (!shuffledAnswerOptions.current) {
    shuffledAnswerOptions.current = [...answerOptions];
    shuffledAnswerOptions.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div className={classes.answerOptionsContainer}>
      <Card className={classes.answerCard}>
        <ul className={classes.answerOptions}>
          {shuffledAnswerOptions.current.map((ans) => {
            const btnIsSelected = selectedAnswer === ans; // target clicked button

            let btnClasses = classes.answerBtn;
            if (btnIsSelected) {
              if (answerState === 'answered') {
                btnClasses += ` ${classes.answered}`;
              } else if (answerState === 'correct') {
                btnClasses += ` ${classes.correct}`;
              } else if (answerState === 'incorrect') {
                btnClasses += ` ${classes.incorrect}`;
              }
            }

            return (
              <li key={ans} className={classes.answer}>
                <Button
                  handleClick={() => onSelect(ans)}
                  className={btnClasses}
                  disabled={answerState !== ''}
                >
                  {ans}
                </Button>
              </li>
            );
          })}
        </ul>
      </Card>
      <div className={classes.skipPlaceholder}>
        {addSkip && (
          <Button
            className={classes.skipBtn}
            handleClick={() => onSelect(null)}
            disabled={answerState !== ''}
          >
            SKIP
          </Button>
        )}
      </div>
    </div>
  );
}

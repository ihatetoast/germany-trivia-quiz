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
        <ul id='answer-options'>
          {shuffledAnswerOptions.current.map((ans, idx) => {
            const btnIsSelected = selectedAnswer === ans; // target clicked button

            let btnClasses = 'answer-btn';

            if (answerState === 'answered' && btnIsSelected) {
              btnClasses = btnClasses + ' answered';
            }

            if (
              (answerState === 'correct' || answerState === 'incorrect') &&
              btnIsSelected
            ) {
              btnClasses = btnClasses + ' ' + answerState;
            }

            return (
              <li key={idx} className='answer'>
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
         
      </Card>    <div className={classes.skipPlaceholder}>
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

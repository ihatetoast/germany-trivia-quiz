import { useRef } from 'react';

import Button from './Button.jsx';

export default function Answers({
  answerOptions, 
  selectedAnswer,
  answerState,
  onSelect,
  onSkip,
  addSkip,
}) {
  // don't shuffle again when state changes
const shuffledAnswerOptions = useRef();

if(!shuffledAnswerOptions.current) {
  shuffledAnswerOptions.current = [...answerOptions];
  shuffledAnswerOptions.current.sort(() => Math.random() - 0.5);
}

  return (
    <div className="answer-options-container">
    <ul id='answer-options'>
      {shuffledAnswerOptions.current.map((ans, idx) => {
        const btnIsSelected = selectedAnswer === ans; // target clicked button
      
        let btnClasses = 'answer-btn';
        
        if( answerState === 'answered' && btnIsSelected) {
          btnClasses = btnClasses + ' answered';
        }

        if ((answerState === 'correct' || answerState === 'incorrect') && btnIsSelected ){
          btnClasses = btnClasses + ' ' + answerState;
        }

        return (
          <li key={idx} className='answer'>
            <Button
              handleClick={() => onSelect(ans)}
              classes={btnClasses}
              disabled={answerState !== ''}
            >
              {ans}
            </Button>
          </li>
        );
      })}
      {addSkip && <li><Button handleClick={() => onSkip()}>Skip!</Button></li>}
 
    </ul></div>
  );
}




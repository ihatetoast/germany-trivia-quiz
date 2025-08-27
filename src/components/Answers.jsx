import Button from './Button.jsx';

export default function Answers({answerOptions, handleAnswerClick}) {
  return (
    <ul id='answer-options'>
      {answerOptions.map((ans, idx) => (
        <li key={idx} className='answer'>
          <Button
            handleClick={() => handleAnswerClick(ans)}
            classes='answer-btn'
          >
            {ans}
          </Button>
        </li>
      ))}
    </ul>
  );
}

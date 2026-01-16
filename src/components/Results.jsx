import { Laugh, Frown, Meh } from 'lucide-react';
import classes from './Results.module.css';

import Button from './Button.jsx';

export default function Results({
  title,
  questionData,
  usersAnswers,
  onRestartQuiz,
  children,
}) {
  console.log(questionData);
  console.log(usersAnswers);
  const quizLength = usersAnswers.length;

  // correct
  const correctLength = usersAnswers.filter(
    (ans, i) => ans === questionData.questions[i].answers[0]
  ).length;
  const rPct = getPercentageStr(correctLength, quizLength, 3);
  // null
  const unansweredLength = usersAnswers.filter((ans) => ans === null).length;
  const uPct = getPercentageStr(unansweredLength, quizLength, 2);
  // incorrect
  const incorrectLength = quizLength - unansweredLength - correctLength;
  const wPct = getPercentageStr(incorrectLength, quizLength, 2);

  function getPercentageStr(part, whole, decimal) {
    const pString = `${((part / whole) * 100).toFixed(decimal)}%`;
    return pString;
  }

  // obj bc may want words, may want data
  const resultData = [
    { name: 'Correct',count: correctLength,  percentage: rPct, color: 'var(--black)', icon: <Laugh /> },
    { name: 'Skipped',count:unansweredLength,  percentage: uPct, color: 'var(--yellow)' , icon: <Meh />},
    { name: 'Incorrect',count: incorrectLength,  percentage: wPct, color: 'var(--red)' , icon: <Frown />},
  ];
  return (
    <div id='results'>
      <h2>{title}</h2>
      <section id='stats'>
        <div>
          <div className='barchart'>
            <div className='barChart-value'></div>
            <div className='barChart-bar'></div>
            <div className='bar-label'></div>
          </div>
          <div className='datalist'>
            <ol>
              {resultData.map((res) => (
                <li key={res.name} className={`${classes.resultItem} ${res.count === 0 ? classes.hide : ''}`}>
                  <span className={`${res.color}-icon`}>{res.icon}</span>
                  <span className="score">{res.name}: {res.percentage} </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section id='result-answers'>{children}</section>

      <Button handleClick={onRestartQuiz} classes='start-btn '>
        Return to start
      </Button>
    </div>
  );
}

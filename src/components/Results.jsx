import { Laugh, Frown, Meh } from 'lucide-react';
import classes from './Results.module.css';

export default function Results({
  title,
  questionData,
  usersAnswers,
  children,
}) {
  const quizLength = usersAnswers.length;

  // right
  const rLength = usersAnswers.filter(
    (ans, i) => ans === questionData.questions[i].answers[0]
  ).length;
  const rPct = getPercentageStr(rLength, quizLength, 1);
  // skip
  const sLength = usersAnswers.filter((ans) => ans === null).length;
  const sPct = getPercentageStr(sLength, quizLength, 1);
  // wrong
  const wLength = quizLength - sLength - sLength;
  const wPct = getPercentageStr(wLength, quizLength, 1);

  function getPercentageStr(part, whole, decimal) {
    const pString = `${((part / whole) * 100).toFixed(decimal)}%`;
    return pString;
  }

  // obj bc may want words, may want data
  const resultData = [
    {
      name: 'right',
      count: rLength,
      percentage: rPct,
      color: 'var(--black)',
      icon: <Laugh />,
    },
    {
      name: 'skip',
      count: sLength,
      percentage: sPct,
      color: 'var(--gold)',
      icon: <Meh />,
    },
    {
      name: 'wrong',
      count: wLength,
      percentage: wPct,
      color: 'var(--red)',
      icon: <Frown />,
    },
  ];
  return (
    <div id='results' className={classes.results}>
      <h2>{title}</h2>
      <section id='stats' className={classes.stats}>
        <div className={classes.barchart}>
          {resultData.map((res) => (
            <div key={res.name} className={classes.resultItem}>
              <div>
                <div className={classes.iconNameContainer}>
                  <span className={classes.icon}>{res.icon}</span>
                  <span className={classes.name}>{res.name}</span>
                </div>
                <div className={classes.score}>{res.percentage}</div>
              </div>
              <div>
                <div
                key={res.name}
                className={classes.barGraphBar}
                style={{
                  '--bar-width': res.percentage,
                  '--bar-color': res.color,
                }}
              ></div>
              </div>
              
            </div>
          ))}
        </div>
      </section>
      <section id='result-answers'>{children}</section>
    </div>
  );
}

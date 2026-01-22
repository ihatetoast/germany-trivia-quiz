import { Laugh, Frown, Meh } from 'lucide-react';
import Button from '../ui/Button';
import classes from './Results.module.css';

export default function Results({ title, resultData, restartQuiz, children }) {
    const icons = {
    correct: <Laugh />,
    skipped:  <Meh />,
    incorrect:  <Frown />,
  }
  return (
    <div id='results' className={classes.results}>
      <section id='stats' className={classes.statsContainer}>
        <div className={classes.stats}>
          <h2>{title}</h2>
          <div className={classes.barchart}>
            {resultData.map((res) => {
              return (
                <div key={res.name} className={classes.resultItem}>
                  <div className={classes.barDescription}>
                    <div className={classes.iconNameContainer}>
                      <span className={classes.icon} aria-hidden="true">{icons[res.name]}</span>
                      <span className={classes.name}>{res.name}</span>
                    </div>
                    <div className={classes.score}>{res.percentage}</div>
                  </div>
                  <div className={classes.barContainer}>
                    <div
                      className={classes.barGraphBar}
                      style={{
                        '--bar-width': res.percentage,
                        '--bar-color': res.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button className={classes.restartBtn} handleClick={restartQuiz}>Restart</Button>
      </section>
      <section className={classes.resultAnswers} id='result-answers'>{children}</section>
    </div>
  );
}

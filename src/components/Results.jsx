import { Laugh, Frown, Meh } from 'lucide-react';
import classes from './Results.module.css';

export default function Results({ title, resultData, children }) {
  return (
    <div id='results' className={classes.results}>
      <section id='stats' className={classes.statsContainer}>
        <div className={classes.stats}>
          <h2>{title}</h2>
          <div className={classes.barchart}>
            {resultData.map((res) => {
              const icon =
                res.name === 'right' ? (
                  <Laugh />
                ) : res.name === 'skip' ? (
                  <Meh />
                ) : (
                  <Frown />
                );
              return (
                <div key={res.name} className={classes.resultItem}>
                  <div>
                    <div className={classes.iconNameContainer}>
                      <span className={classes.icon}>{icon}</span>
                      <span className={classes.name}>{res.name}</span>
                    </div>
                    <div className={classes.score}>{res.percentage}</div>
                  </div>
                  <div className={classes.barContainer}>
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
              );
            })}
          </div>
        </div>
      </section>
      <section className={classes.resultAnswers} id='result-answers'>{children}</section>
    </div>
  );
}

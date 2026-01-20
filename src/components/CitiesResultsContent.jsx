import {useState} from 'react'
import Card from '../ui/Card';

import classes from './CitiesResultsContent.module.css';

const CitiesResultsContent = ({
  usersAnswers,
  questions,
  rightCount,
  imageData,
}) => {
  const [expanded, setExpanded] = useState(false);
  const perfectScore = rightCount === questions.length;
  const wrongAnswers = usersAnswers.filter(
    (ans, idx) => ans !== questions[idx].answers[0]
  );

  console.log(wrongAnswers);
  const capPos = {
    stuttgart: { top: '32.4%', left: '80.9%' },
    munich: { top: '87%', left: '56.5%' },
    // berlin: { top: '88.2%', left: '60%' },
    // potsdam: { top: '88.2%', left: '60%' },
    // bremen: { top: '88.2%', left: '60%' },
    // hamburg: { top: '88.2%', left: '60%' },
    // wiesbaden: { top: '88.2%', left: '60%' },
    // hanover: { top: '88.2%', left: '60%' },
    // schwerin: { top: '88.2%', left: '60%' },
    // mainz: { top: '88.2%', left: '60%' },
    // dusseldorf: { top: '88.2%', left: '60%' },
    // saarbrucken: { top: '88.2%', left: '60%' },
    // dresden: { top: '88.2%', left: '60%' },
    // magdeburg: { top: '88.2%', left: '60%' },
    // kiel: { top: '88.2%', left: '60%' },
    // erfurt: { top: '88.2%', left: '60%' },
  };
  // eturn Object.keys(object).find(key => object[key] === value);

  return (
    <div className={classes.citiesQuizContainer}>
      <div className={classes.citiesQuizResultsMobile}>
        <div className={classes.imageContainerMobile}>
          <img src={imageData.image.srcMob} alt={imageData.image.altMob} />
        </div>
        <div className={classes.answersContainerMobile}>
          {perfectScore && <p>Congrats! You aced it! </p>}
          {!perfectScore && <h2>States to review</h2>}
          <div className={classes.cardContainer}>
            {!perfectScore &&
              wrongAnswers.map((ans, idx) => (
                <Card key={idx} className={classes.resultsCard}>
                  <h3>{questions[idx].question}</h3>
                  <p>{questions[idx].answers[0]}</p>
                  <p className={classes.wrong}>
                    <span>❌</span>
                    {ans || 'Skipped'}
                  </p>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <div className={classes.citiesQuizResultsDesktop}>
        <div className={classes.imageContainerDesktop}>
          
          <img src={imageData.image.src} alt={imageData.image.alt} />
        </div>
      </div>
    </div>
  );
};
// question.id needs to match the capPos
// {questions.map((city, idx) => {

            // return <div key={city.question} className={classes.capitalDot} >{city.question}<div>{usersAnswers[idx]}</div><div>{city.answers[0]}</div></div>})}

export default CitiesResultsContent;

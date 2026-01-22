import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

import classes from './CitiesResultsContent.module.css';

const CitiesResultsContent = ({
  usersAnswers,
  questions,
  rightCount,
  imageData,
}) => {
  const [activeState, setActiveState] = useState(null);
  const perfectScore = rightCount === questions.length;
  /**
   * take user answers [a, g, c, d] (correct would be [a, b, c, d])
   * create[{ans: a, idx: 0, q: 1st}, {ans: b, idx: 1, q: 2nd}, ...
   * then filter first item.ans doesn't equal the first questions arr at 0
   * end up with [{ans: g, idx: 1, question: "what is bee?"}] user said g. 
   */
  const wrongAnswers = usersAnswers
    .map((ans, idx) =>({ans, idx, question:questions[idx]}))
    .filter(item => item.ans !== item.question.answers[0]);


  // positions for the map from pixabay. if you change the map, you have to change this.
  // positions for caps are relative to map container at top-left origin
  // map has a small dot where the capital is, so the position is for the center of the start to cover dot
  // format is the stateId: top: y%, left: x%
  const capPos = {
    stuttgart: { top: '79.4%', left: '32%' },
    munich: { top: '87.5%', left: '60%' },
    berlin: { top: '32%', left: '81%' },
    potsdam: { top: '33%', left: '76%' },
    bremen: { top: '26%', left: '32%' },
    hamburg: { top: '20%', left: '44%' },
    wiesbaden: { top: '61.5%', left: '22.5%' },
    hanover: { top: '34%', left: '40%' },
    schwerin: { top: '18.5%', left: '58%' },
    mainz: { top: '64%', left: '22%' },
    dusseldorf: { top: '47%', left: '7%' },
    saarbrucken: { top: '72%', left: '7%' },
    dresden: { top: '51%', left: '85%' },
    magdeburg: { top: '36.5%', left: '61%' },
    kiel: { top: '9.5%', left: '45%' },
    erfurt: { top: '52%', left: '53%' },
  };

  // combine info from props to the loc for new arr
  // use this to map over for buttons
  const stateResults = questions.map((ques, idx) => ({
    stateId: ques.id, // for this quiz, id is cap city 'munich' etc
    stateName: ques.question, // 'Munich'
    rightAnswer: ques.answers[0],
    userAnswer: usersAnswers[idx],
    isCorrect: usersAnswers[idx] === ques.answers[0],
    position: capPos[ques.id], // perc left and down from map.
  }));

  return (
    <div className={classes.citiesQuizContainer}>
      <div className={classes.citiesQuizResultsMobile}>
        <div className={classes.imageContainerMobile}>
          <img src={imageData.srcMob} alt={imageData.altMob} />
        </div>
        <div className={classes.answersContainerMobile}>
          {perfectScore && <h2>Congrats! You aced it! </h2>}
          {!perfectScore && <h2>States to review</h2>}
          <div className={classes.cardContainer}>
            {!perfectScore &&
              wrongAnswers.map((item) => (
                <Card key={item.question.id} className={classes.resultsCard}>
                  <h3>{item.question.question}</h3>
                  <p>{item.question.answers[0]}</p>
                  <p className={classes.wrong}>
                    <span>❌</span>
                    {item.ans || 'Skipped'}
                  </p>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <div className={classes.citiesQuizResultsDesktop}>
        <div className={classes.mapAnswerContainer}>
          <div className={classes.imageContainerDesktop}>
            <img src={imageData.src} alt={imageData.alt} />
          </div>
          <div className={classes.capitalBoxContainer}>
            {activeState && (
              <div
                style={{
                  top: activeState.position.top,
                  left: activeState.position.left,
                }}
                className={classes.capitalBox}
              >
                <p className={classes.boxQuestion}>
                  <span className={classes.boxEmoji} aria-label={activeState.isCorrect ? 'Correct' : 'Incorrect'}>{activeState.isCorrect ? '✅' : '❌'}</span>{' '}
                  {activeState.stateName}
                </p>
                <p>{activeState.rightAnswer}</p>
                {!activeState.isCorrect && (
                  <p className={classes.boxWrong}>{activeState.userAnswer || 'Skipped'}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={classes.statesList}>
          <h2>Results</h2>
          <p>Click on a state below to reveal it and its capital in the map.</p>
          <ul>
            {stateResults.map((state) => (
              <li key={state.stateId}>
                <Button
                  handleClick={() => setActiveState(state)}
                  className={
                    state.isCorrect ? classes.correctBtn : classes.incorrectBtn
                  }
                ><span className={classes.statesListBtnEmoji} aria-label={state.isCorrect ? 'Correct' : 'Incorrect'}>{state.isCorrect ? '✅' : '❌'}</span>
                  <p> {state.stateName}</p>
                  
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CitiesResultsContent;

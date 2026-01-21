import classes from './GenericResultsContent.module.css';
import Card from '../ui/Card'
const GenericResultsContent = ({ usersAnswers, questions, imageData }) => {

  return (
    <div className={classes.resultsContainer}>
    {imageData && <div className={classes.imgContainer}>
      <img src={imageData.image.src} alt={imageData.image.alt}/>
      </div>}
    <div className="btn-cards-container">
      {usersAnswers.map((ans, idx) => {
        const incGuess = ans !== questions[idx].answers[0];
        return (
          <Card key={questions[idx].id} className={classes.resultCard}>
            <h3 className={classes.question}>
              {questions[idx].question}
            </h3>
            <ul>
              <li>Ans: {questions[idx].answers[0]}</li>
              {incGuess && <li className={classes.wrong}>You: {ans || "Skipped"}</li>}
            </ul>
          </Card>
        );
      })}
    </div></div>
  );
};

export default GenericResultsContent;


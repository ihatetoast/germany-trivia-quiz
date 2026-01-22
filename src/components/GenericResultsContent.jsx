import classes from './GenericResultsContent.module.css';
import Card from '../ui/Card'
const GenericResultsContent = ({ usersAnswers, questions, imageData }) => {

  return (
    <div className={classes.resultsContainer}>
    {imageData?.image && <div className={classes.imgContainer}>
      <img src={imageData.src} alt={imageData.alt}/>
      </div>}
    <div className="btn-cards-container">
      {usersAnswers.map((ans, idx) => {
        const isIncorrect = ans !== questions[idx].answers[0];
        return (
          <Card key={questions[idx].id} className={classes.resultCard}>
            <h3 className={classes.question}>
              {questions[idx].question}
            </h3>
            <ul>
              <li>Ans: {questions[idx].answers[0]}</li>
              {isIncorrect && <li className={classes.wrong}>You: {ans || "Skipped"}</li>}
            </ul>
          </Card>
        );
      })}
    </div></div>
  );
};

export default GenericResultsContent;


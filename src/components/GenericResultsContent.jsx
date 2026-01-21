import classes from './GenericResultsContent.module.css';
import Card from '../ui/Card'
const GenericResultsContent = ({ usersAnswers, questions }) => {


  return (
    <div className="btn-cards-container">
      {usersAnswers.map((ans, idx) => {
        const incGuess = ans !== questions[idx].answers[0];
        return (
          <Card key={ans} className={classes.resultCard}>
            <h3 className={classes.question}>
              {idx + 1}. {questions[idx].question}
            </h3>
            <ul>
              <li>Ans: {questions[idx].answers[0]}</li>
              {incGuess && <li className={classes.wrong}>You: {ans || "Skipped"}</li>}
            </ul>
          </Card>
        );
      })}
    </div>
  );
};

export default GenericResultsContent;


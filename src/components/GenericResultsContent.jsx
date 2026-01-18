import classes from './GenericResultsContent.module.css';

const GenericResultsContent = ({ usersAnswers, questions }) => {


  return (
    <div className={classes.resultsContainer}>
      {usersAnswers.map((ans, idx) => {
        const incGuess = ans !== questions[idx].answers[0];
        return (
          <div key={ans} className={classes.resultCard}>
            <h3 className={classes.question}>
              {idx + 1}. {questions[idx].question}
            </h3>
            <ul>
              <li>Ans: {questions[idx].answers[0]}</li>
              {incGuess && <li className={classes.wrong}>Your answer: {ans || "Skipped"}</li>}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default GenericResultsContent;


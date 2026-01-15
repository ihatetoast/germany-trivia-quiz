import { useCallback, useState } from 'react';


import QuizQuestion from './QuizQuestion.jsx';

import Results from './Results.jsx';


export default function QuizPage({timerVal, onStartQuiz, questionData}) {
  console.log(questionData);
  const [usersAnswers, setUsersAnswers] = useState([]);

  const currentQuestionIdx = usersAnswers.length;

  const quizCompleted = questionData.questions.length === currentQuestionIdx;

  // useCallback to avoid recreating fcn on rerendering
  const handleSelectUserAnswer = useCallback(
    function handleSelectUserAnswer(answer) {
      setUsersAnswers((prevAnswer) => {
        return [...prevAnswer, answer];
      });
    },
    []
  );

  const handleNotAnswered = useCallback(() => {
    handleSelectUserAnswer(null);
  }, [handleSelectUserAnswer]);

  // results will have some data (percentage) and the right answers
  // the german states answers will show the map.
  // Any other quiz will just be answers
  const statesAnswers = <img className='germany-map' src={questionData.resultsImg} alt={questionData.resultsImgAlt} />
;
const foodDrinkAnswers = <span>{questionData.topicTitle} FOOD DRINK DEAL WITH LATER</span>;
  if (quizCompleted) {
    return <Results title='Quiz is over' onStartQuiz={onStartQuiz}>{"bob"}
      {questionData.topicTitle === 'German capital cities' ? statesAnswers : foodDrinkAnswers}
    </Results>;
  }

  return (
    <div className='quiz-board'>
      <QuizQuestion 
      key={currentQuestionIdx}
      idx={currentQuestionIdx}
      timerVal={timerVal}
      question={questionData.questions[currentQuestionIdx]}
      onNotAnswered={handleNotAnswered}
      handleAnswerClick={handleSelectUserAnswer}
      />
    </div>
  );
}

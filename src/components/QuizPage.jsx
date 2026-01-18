import { useCallback,useEffect, useState } from 'react';

import QuizQuestion from './QuizQuestion.jsx';

import Results from './Results.jsx';

import CitiesResultsContent from './CitiesResultsContent.jsx';
import GenericResultsContent from './GenericResultsContent.jsx';

export default function QuizPage({ timerVal, questionData, restartQuiz }) {
  const [usersAnswers, setUsersAnswers] = useState([]);
  // note to remember in the future--if you can, derive. derive until you run out geyassoline
  // length number is number of answered + 1 (bc of 0 idx)
  // i.e. if there are two (len is 2), the next question is at 0, 1, 2 (the third/next q)
  const currentQuestionIdx = usersAnswers.length;

  const quizCompleted = questionData.questions.length === currentQuestionIdx;

  // useCallback to avoid recreating fcn on rerendering when user picks and answer
  const handleSelectUserAnswer = useCallback(function handleSelectUserAnswer(
    answer
  ) {
    setUsersAnswers((prevAnswer) => {
      return [...prevAnswer, answer];
    });
  },
  []);


  const handleNotAnswered = useCallback(() => {
    handleSelectUserAnswer(null);
  }, [handleSelectUserAnswer]);

  useEffect(() =>{
    if(usersAnswers.length === questionData.length) {
          restartQuiz()
    }
  }, [questionData, usersAnswers, restartQuiz])

  // results will have some data (percentage) and the right answers
  // the german states answers will show the map.
  // Any other quiz will just be answers
  const capCitiesResults = <CitiesResultsContent usersAnswers={usersAnswers}/>;

  // results will have two sections: stats and answers.
  const genericResults = <GenericResultsContent usersAnswers={usersAnswers}  questions={questionData.questions}/>
  if (quizCompleted) {
    return (
      <Results
        title={`${questionData.topicTitle} quiz completed`}
        questionData={questionData}
        usersAnswers={usersAnswers}
      >
        {questionData.topicTitle === 'German capital cities'
          ? capCitiesResults
          : genericResults}
      </Results>
    );
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

import { useCallback, useState } from 'react';

import QuizQuestion from './QuizQuestion.jsx';

import Results from './Results.jsx';

import GermanCitiesResults from './GermanCitiesResults.jsx';

export default function QuizPage({ timerVal, onRestartQuiz, questionData }) {
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

  // results will have some data (percentage) and the right answers
  // the german states answers will show the map.
  // Any other quiz will just be answers
  const statesAnswers = <GermanCitiesResults usersAnswers={usersAnswers}/>;

  // results will have two sections: stats and answers.
  const foodDrinkAnswers = (
    <span>{questionData.topicTitle} FOOD DRINK DEAL WITH LATER</span>
  );
  if (quizCompleted) {
    return (
      <Results
        title={`${questionData.topicTitle} quiz completed`}
        questionData={questionData}
        usersAnswers={usersAnswers}
        onRestartQuiz={onRestartQuiz}
      >
        {questionData.topicTitle === 'German capital cities'
          ? statesAnswers
          : foodDrinkAnswers}
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

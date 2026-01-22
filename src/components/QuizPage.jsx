import { useCallback, useState } from 'react';

import QuizQuestion from './QuizQuestion.jsx';

import Results from './Results.jsx';

import CitiesResultsContent from './CitiesResultsContent.jsx';
import GenericResultsContent from './GenericResultsContent.jsx';

export default function QuizPage({ timerVal, questionData, restartQuiz }) {
  const [usersAnswers, setUsersAnswers] = useState([]);
  const currentQuestionIdx = usersAnswers.length;
  const quizCompleted = questionData.questions.length === currentQuestionIdx;

  // NOTE: useCallback to avoid recreating fcn on rerendering when user picks an answer
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


  const quizLength = usersAnswers.length;

  // right
  const correctCount = usersAnswers.filter(
    (ans, i) => ans === questionData.questions[i].answers[0]
  ).length;
  const correctPct = getPercentageStr(correctCount, quizLength, 1);
  // skip
  const skippedCount = usersAnswers.filter((ans) => ans === null).length;
  const skippedPct = getPercentageStr(skippedCount, quizLength, 1);
  // wrong
  const incorrectCount = quizLength - correctCount - skippedCount;
  const wrongPct = getPercentageStr(incorrectCount, quizLength, 1);

  function getPercentageStr(part, whole, decimal) {
    if(whole === 0) return '0%';
    return `${((part / whole) * 100).toFixed(decimal)}%`;
  }

  const resultData = [
    {
      name: 'correct',
      count: correctCount,
      percentage: correctPct,
      color: 'var(--black)',
    },
    {
      name: 'incorrect',
      count: incorrectCount,
      percentage: wrongPct,
      color: 'var(--red)',
    },
    {
      name: 'skipped',
      count: skippedCount,
      percentage: skippedPct,
      color: 'var(--gold)',
    },
  ];

  // results will have some data (percentage) and the questions with right and/or wrong answers
  // the german states answers will show the map (complete map on mob, map with capitalBoxes revealed on a click)
  const capCitiesResults = (
    <CitiesResultsContent
      usersAnswers={usersAnswers}
      questions={questionData.questions}
      rightCount={correctCount}
      imageData={questionData.resultsImg}
    />
  );


  const genericResults = (
    <GenericResultsContent
      usersAnswers={usersAnswers}
      questions={questionData.questions}
      imageData={questionData.resultsImg}
    />
  );

  if (quizCompleted) {
    return (
      <Results
        title={`${questionData.topicTitle} results:`}
        resultData={resultData}
        restartQuiz={restartQuiz}
      >
        {questionData.type === 'cities'
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

import { useCallback, useState } from 'react';

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


  const quizLength = usersAnswers.length;

  // right
  const rLength = usersAnswers.filter(
    (ans, i) => ans === questionData.questions[i].answers[0]
  ).length;
  const rPct = getPercentageStr(rLength, quizLength, 1);
  // skip
  const sLength = usersAnswers.filter((ans) => ans === null).length;
  const sPct = getPercentageStr(sLength, quizLength, 1);
  // wrong
  const wLength = quizLength - rLength - sLength;
  const wPct = getPercentageStr(wLength, quizLength, 1);

  function getPercentageStr(part, whole, decimal) {
    const pString = `${((part / whole) * 100).toFixed(decimal)}%`;
    return pString;
  }
  const resultData = [
    {
      name: 'right',
      count: rLength,
      percentage: rPct,
      color: 'var(--black)',
    },
    {
      name: 'wrong',
      count: wLength,
      percentage: wPct,
      color: 'var(--red)',
    },
    {
      name: 'skip',
      count: sLength,
      percentage: sPct,
      color: 'var(--gold)',
    },
  ];

  // results will have some data (percentage) and the right answers
  // the german states answers will show the map.Any other quiz will just be answers
  const capCitiesResults = (
    <CitiesResultsContent
      usersAnswers={usersAnswers}
      questions={questionData.questions}
      rightCount={rLength}
      imageData={{
        image: questionData.resultsImg,
        imageAlt: questionData.resultsImgAlt,
      }}
    />
  );

  // results will have two sections: stats and answers.
  const genericResults = (
    <GenericResultsContent
      usersAnswers={usersAnswers}
      questions={questionData.questions}
      imageData={{
        image: questionData.resultsImg,
        imageAlt: questionData.resultsImgAlt,
      }}
    />
  );

  if (quizCompleted) {
    return (
      <Results
        title={`${questionData.topicTitle} results:`}
        resultData={resultData}
        restartQuiz={restartQuiz}
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
      {}
    </div>
  );
}

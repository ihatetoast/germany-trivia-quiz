import { useCallback, useState } from 'react';

import Answers from './Answers.jsx';
import Timer from './Timer.jsx';

import Results from './Results.jsx';
import TOPICS from '../topics.js';

/**
 *
 * NOTE ON TOPICS
 * currently you're making a quiz of just the capitals.
 * array of topics is the capitals copmleted plus one other topic to test
 * when there's more than one.
 *
 * later. much later.
 * build a second quiz to 4 questions to work on the functionality to test
 * choosing the quiz topic.
 *
 * so for now the state is forced to be the first item in the topics array
 */

export default function QuizPage() {
  const [usersAnswers, setUsersAnswers] = useState([]);

  // setQuix later
  const [quiz, setQuiz] = useState(TOPICS[0].questions);

  const currentQuestionIdx = usersAnswers.length;

  const quizCompleted = TOPICS[0].questions.length === currentQuestionIdx;

  const handleSelectUserAnswer = useCallback(function handleSelectUserAnswer(answer) {
    setUsersAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, answer];
    });
  },
  []);

  const handleNotAnswered = useCallback(() => {
    handleSelectUserAnswer(null);
  }, [handleSelectUserAnswer]);

  // Show results when the quiz is done.
  // we know this when length of possible questions arr
  // is same as length of user's answers

  if (quizCompleted) {
    return <Results title={'Quiz is over'} />;
  }

  // copy the data so sorting does not change og arr
  const currentAnswerOptions = [...quiz[currentQuestionIdx].answers];
  currentAnswerOptions.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz-board'>
      <Timer key={currentQuestionIdx} duration={10000} onTimesUp={handleNotAnswered} />
      <h2>{quiz[currentQuestionIdx].question}</h2>
      <Answers
        answerOptions={currentAnswerOptions}
        handleAnswerClick={handleSelectUserAnswer}
      />
    </div>
  );
}

import { useCallback, useState } from 'react';


import QuizQuestion from './QuizQuestion.jsx';

import Results from './Results.jsx';
import TOPICS from '../topics.js';

export default function QuizPage({onStartQuiz}) {
  const [usersAnswers, setUsersAnswers] = useState([]);

  // handle varying quiz topics later. hard code at 0 for now
  const quiz = TOPICS[0].questions


  // if the question has not been answered, use the answers arr length
  // if it has been answered, keep the current index at previous to hold off on
  // advancing to the next. This will let me show quiztaker right/wrong feedback via style
  const currentQuestionIdx = usersAnswers.length;

  const quizCompleted = quiz.length === currentQuestionIdx;

  // useCallback to avoid recreating fcn on rerendering
  const handleSelectUserAnswer = useCallback(
    function handleSelectUserAnswer(answer) {
      setUsersAnswers((prevAnswer) => {
        return [...prevAnswer, answer];
      });
    },
    []
  );

  // if the timer runs out and the user didn't answer.
  // not a skip, skipping (to me) is a choice like saying "pass"
  // don't have pass option 
  const handleNotAnswered = useCallback(() => {
    handleSelectUserAnswer(null);
  }, [handleSelectUserAnswer]);

  // Show results when the quiz is done.
  // we know this when length of possible questions arr
  // is same as length of user's answers

  if (quizCompleted) {
    return <Results title='Quiz is over' onStartQuiz={onStartQuiz}/>;
  }

  return (
    <div id='quiz-board'>
      <QuizQuestion 
      key={currentQuestionIdx}
      idx={currentQuestionIdx}
      onNotAnswered={handleNotAnswered}
      handleAnswerClick={handleSelectUserAnswer}
      />
    </div>
  );
}


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
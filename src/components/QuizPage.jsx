import { useCallback, useState } from 'react';


import QuizQuestion from './QuizQuestion.jsx';

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

  // setQuiz later
  const [quiz, setQuiz] = useState(TOPICS[0].questions);
  // answerstate used for styling purp
  const [answerState, setAnswerState] = useState('');

  // if the question has not been answered, use the answers arr length
  // if it has been answered, keep the current index at previous to hold off on
  // advancing to the next. This will let me show quiztaker right/wrong feedback via style
  const currentQuestionIdx =
    answerState === '' ? usersAnswers.length : usersAnswers.length - 1;

  const quizCompleted = quiz.length === currentQuestionIdx;

  // useCallback to avoid recreating fcn on rerendering
  const handleSelectUserAnswer = useCallback(
    function handleSelectUserAnswer(answer) {
      setAnswerState('answered');
      setUsersAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, answer];
      });

      // console.log('true answer: ', quiz[currentQuestionIdx].answers[0]);
      // console.log(('user answer: ', answer));

      setTimeout(() => {
        if (quiz[currentQuestionIdx].answers[0] === answer) {
          setAnswerState('correct');
        } else {
          setAnswerState('incorrect');
        }
        // let the style sit and then reset answerstate to '' to move along
        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [quiz, currentQuestionIdx]
  );

  const handleNotAnswered = useCallback(() => {
    handleSelectUserAnswer(null);
  }, [handleSelectUserAnswer]);

  // Show results when the quiz is done.
  // we know this when length of possible questions arr
  // is same as length of user's answers

  if (quizCompleted) {
    return <Results title={'Quiz is over'} />;
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

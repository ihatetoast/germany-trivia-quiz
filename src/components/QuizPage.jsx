import { useState } from 'react';

import Button from './Button.jsx';

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
  const [quiz, setQuiz] = useState(TOPICS[0].questions);

  const currentQuestionIdx = usersAnswers.length;
  console.log(quiz);
  // capital cities is first

  const currentAnswerOptions = quiz[currentQuestionIdx].answers.sort(
    () => Math.random() - 0.5
  );
  return (
    <div id='quiz-board'>
      <h2>{quiz[currentQuestionIdx].question}</h2>
      <ul id='answer-options'>
        {currentAnswerOptions.map((ans, idx) => (
          <li key={idx + '' + currentQuestionIdx} className='answer'>
            <Button classes='answer-btn'>{ans}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

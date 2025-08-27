import { useState } from 'react';

import Header from './components/Header.jsx';
import Button from './components/Button.jsx';
import QuizPage from './components/QuizPage.jsx';

import TOPICS from './topics.js';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  // fill out later. now just go to page to start quiz.
  // buttons to determine the theme? First step, just states
  // map over topics.js for topic. All after quiz functions
  // so for now force it to be capitals. handle setting topic on
  // button click later.

  const [topic, setTopic] = useState(TOPICS[0]);

  function handleStartQuiz() {
    setQuizStarted(!quizStarted);
  }

  return (
    <>
      <Header topic={topic.topic} />
      <main>
        {!quizStarted && (
          <div className='btns-container'>
            <Button handleClick={handleStartQuiz} classes='start-btn '>
              {`Start ${topic.topic} quiz`}
            </Button>
          </div>
        )}
        {quizStarted && <QuizPage />}
      </main>
    </>
  );
}

export default App;

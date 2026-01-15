import { useState } from 'react';

import Header from './components/Header.jsx';
import TimeSelect from './components/TimeSelect.jsx';
import Button from './components/Button.jsx';
import QuizPage from './components/QuizPage.jsx';

import TOPICS from './topics.js';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [topic, setTopic] = useState([]);
  const [time, setTime] = useState(0);

  function handleStartQuiz(topicId) {
    setTopic(TOPICS[topicId - 1]);
    setQuizStarted((prev) => !prev);
  }

  function handleSelectChange(timeVal) {
    const ms = timeVal === '0' ? 0 : parseInt(timeVal) * 1000;
    setTime(ms)
    console.log(ms);
  }
  return (
    <>
      <Header topic={topic.topic ?? 'German cultural trivia'} />
      <main>
        {!quizStarted && (
          <>
            <section className='start-page-intro'>
              <p className='instructions-para'>
                Choose a topic and a difficulty level (how fast the timer counts down) for each question. If you make no choice, the quiz will be untimed. 
              </p>
            </section>
            <section className='btns-container'>
              <TimeSelect onSelect={handleSelectChange}/>
              {TOPICS.map((t) => (
                <Button
                  key={t.id}
                  handleClick={() => handleStartQuiz(t.id)}
                  classes='start-btn '
                >
                  {`${t.topic} quiz`}
                </Button>
              ))}
            </section>
          </>
        )}
        {quizStarted && (
          <QuizPage
            timerVal={time}
            onStartQuiz={handleStartQuiz}
            questionData={{
              topicTitle: topic.topic,
              questions: topic.questions,
              resultsImg: topic.resultsImg,
              resultsImgAlt: topic.resultsImgAlt,
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;

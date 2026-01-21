import { useState } from 'react';

import Header from './ui/Header.jsx';
import TimeSelect from './components/TimeSelect.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';
import QuizPage from './components/QuizPage.jsx';

import TOPICS from './topics.js';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [topic, setTopic] = useState([]);
  const [time, setTime] = useState(0);

  const [gameIsOver, setGameIsOver] = useState(false);

  function handleStartQuiz(topicId) {
    const selectedTopic = TOPICS.find((t, ) => t.id === topicId);
    setTopic(selectedTopic);
    setQuizStarted((prev) => !prev);
  }

  function handleRestartQuiz() {
    setQuizStarted(false);
    setTopic([]);
    setTime(0);
  }

  function handleSelectChange(timeVal) {
    const ms = timeVal === '0' ? 0 : parseInt(timeVal) * 1000;
    setTime(ms);
  }

  let shuffledQuestions;
  if (quizStarted) {
    shuffledQuestions = topic.questions.sort(() => Math.random() - 0.5);
  }

  return (
    <>
      <Header topic={topic.topic ?? 'German cultural trivia'}>
        {gameIsOver && (
          <Button handleClick={handleRestartQuiz} className='start-btn '>
            Try again?
          </Button>
        )}
      </Header>
      <main>
        {!quizStarted && (
          <>
            <section className='start-page-intro'>
              <TimeSelect onSelect={handleSelectChange} />
            </section>
            <section className='btn-cards-container'>
              {TOPICS.map((t) => (
                <Card className='start-quiz-card' key={t.id}>
                  <p>Test your knowledge on {t.topic}. ({t.questions.length}&nbsp;questions)</p>
                  <Button
                    handleClick={() => handleStartQuiz(t.id)}
                    className='start-btn '
                  >START QUIZ
                  </Button>
                </Card>
              ))}
            </section>
          </>
        )}
        {quizStarted && (
          <QuizPage
            timerVal={time}
            restartQuiz={handleRestartQuiz}
            questionData={{
              topicTitle: topic.topic,
              questions: shuffledQuestions,
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

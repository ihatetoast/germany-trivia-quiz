import { useState } from 'react';

import Header from './ui/Header.jsx';
import TimeSelect from './components/TimeSelect.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';
import QuizPage from './components/QuizPage.jsx';

import TOPICS from './topics.js';

import wurst from './assets/images/sausage-5448952_1280.png';


function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [topic, setTopic] = useState([]);
  const [time, setTime] = useState(0);

  function handleStartQuiz(topicId) {
    const selectedTopic = TOPICS.find((t) => t.id === topicId);
    const shuffled = [...selectedTopic.questions].sort(
      () => Math.random() - 0.5
    ); // moved from if
    setTopic({ ...selectedTopic, questions: shuffled });
    setQuizStarted(true);
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

  return (
    <>
      <Header topic={topic.topic ?? 'German cultural trivia'} image={wurst} imageAlt="a sausage in sunglasses smiling and giving the thumbs up"/>
      <main>
        {!quizStarted && (
          <>
            <section className='start-page-intro'>
              <TimeSelect onSelect={handleSelectChange} />
            </section>
            <section className='btn-cards-container'>
              {TOPICS.map((t) => (
                <Card className='start-quiz-card' key={t.id}>
                  <p>
                    Test your knowledge on {t.topic}. ({t.questions.length}
                    &nbsp;questions)
                  </p>
                  <Button
                    handleClick={() => handleStartQuiz(t.id)}
                    className='start-btn '
                  >
                    START QUIZ
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
              questions: topic.questions,
              resultsImg: topic.resultsImg,
              type: topic.type
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;

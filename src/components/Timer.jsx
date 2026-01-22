import { useEffect, useState } from 'react';

import ProgressBier from '../ui/ProgressBier';
export default function Timer({ duration, onTimesUp, answerState }) {
  const [isMobile] = useState(window.innerWidth < 900); 
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(onTimesUp, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onTimesUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 100);
    }, 100);
    // strict mode will make this run twice, clean up existing so we have only one at a time
    return () => {
      clearInterval(interval);
    };
  }, []);
  const questionIsEvaluated =
    answerState === 'correct' || answerState === 'incorrect';

  return (
    <div
      id='timer-progress-bar'
      className={!questionIsEvaluated ? '' : 'hidden'}
    >
      {isMobile && <progress aria-label="Time remaining"  max={duration} value={timeRemaining} />}
      {!isMobile && <ProgressBier duration={duration} timeRemaining={timeRemaining}/>}
    </div>
  );
}

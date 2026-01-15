import { useEffect, useState } from 'react';

export default function Timer({ duration, onTimesUp, answerState }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
// Why timers need useEffect: åthey're counting down
// the nature of the tmer would cause inf loop because of 
// the interval. INterval's updating the time rem state would
// rerender another timer, so settime out needs protection, too.



  useEffect(() => {
    const timer = setTimeout(onTimesUp, duration);
    return ()=>{
      clearTimeout(timer);
    }
  }, [duration, onTimesUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, []);
    const questionIsEvaluated = answerState === 'correct' || answerState === 'incorrect';

  return (
    <progress id='timer-progress-bar' max={duration} value={timeRemaining} className={!questionIsEvaluated ? "" : "hidden"}/>
  );
}

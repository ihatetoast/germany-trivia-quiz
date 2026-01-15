

import Button from './Button.jsx';


export default function Results({title, onStartQuiz, children}) {
  return (
    <div id="results">
      <h2>{title}</h2>
      <div id="stats">
        <ol>
          <li>x/total right</li>
          <li>y/total wrong</li>
          <li>z/total skipped</li>
        </ol>
      </div>
      <div id="result-answers">
{children}
      </div>
      <Button handleClick={onStartQuiz} classes='start-btn '>Return to start</Button>
    </div>
  )
}


// todo first: just the stats 
// todo after (when you're styling for the end):
// map of states: pos abs, have states on states 
// and hover to get answers / show cap. 
// maybe something else? maybe never finish this and leave this 
// component for play?
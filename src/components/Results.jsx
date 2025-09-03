import map from '../assets/map-304071_1280.png';

import Button from './Button.jsx';

import classes from './Results.module.css';

export default function Results({title, onStartQuiz}) {
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
        <img className={classes['germany-map']} src={map} alt="map of Germany showing the states" />
        <p>maybe this will be unique to quiz theme. to do later. mebbeh</p>
      </div>
      <Button handleClick={onStartQuiz} classes='start-btn '>Return to start</Button>
    </div>
  )
}

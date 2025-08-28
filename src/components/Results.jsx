import map from '../assets/map-304071_1280.png';

import classes from './Results.module.css';

export default function Results({title}) {
  return (
    <div id="results">
      <h2>{title}</h2>
      <div id="stats">
        <ul>
          <li>x/total right</li>
          <li>y/total wrong</li>
          <li>z/total skipped</li>
        </ul>
      </div>
      <div id="result-answers">
        <img className={classes['germany-map']} src={map} alt="map of Germany showing the states" />
        <p>maybe this will be unique to quiz theme. to do later. mebbeh</p>
      </div>
    </div>
  )
}

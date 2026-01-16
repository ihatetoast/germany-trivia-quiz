import React from 'react'

// because this is only with the german cap cities, 
// import and don't pass down.
import TOPICS from '../topics.js';

import classes from './GermanCitiesResults.module.css'

  // resultsImg is '/images/map-304071_1280.png',
  //   resultsImgAlt

  // ideas

  // 1) map without text
  //    list of states. click to reveal the name and correct
  //.   capital. if the answer was incorrect, include that 
  //.   below the button? or also over the map?
  //.   NOTE because some states are small or city-states
  //.   have click reveal some visual clue. (a11y friendly hidden list of answers?)

  //  2) map with the state/city-state names
  //.   click on name to reveal right and or incorrect user answer

  //  3) static map.

  // make sure there is some screenreader option

const GermanCitiesResults = ({}) => {
  const capitalCitiesData = TOPICS.find(t => t.id === '1');
  console.log(capitalCitiesData);
  return (
    <div className={classes.citiesQuizContainer}>
      <div className={classes.mapContainer}>
        <img className='germany-map' src={capitalCitiesData.resultsImg} alt={capitalCitiesData.resultsImgAlt} />
      </div>
      
    </div>
  )
}

export default GermanCitiesResults
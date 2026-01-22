import bierstein from '../assets/images/beer-309778_1280.png';
import classes from './ProgressBier.module.css';

export default function ProgressBier({ timeRemaining, duration }) {
  const progress = timeRemaining / duration;

  return (
    <div className={classes.bierPngContainer}>
      <div className={classes.bierProgressBar}>
        <div
          className={classes.bierPngProgressFill}
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <div className={classes.biersteinColor}></div>
      <div className={classes.bierstein}>
        <img src={bierstein} alt='empty beer stein outline' />
      </div>
    </div>
  );
}

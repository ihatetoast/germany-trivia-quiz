import wurst from '../assets/images/sausage-5448952_1280.png';

import Button from './Button'

import classes from './Header.module.css';

export default function Header({ topic, children }) {
  return (
    <header className={classes.header}>
      <div>
        <h1>German Trivia Quiz</h1>
        <p>{`Test your knowledge on ${topic}`}</p>
      </div>
      <div className={classes.imageContainer}>
<img
        className={classes.image}
        src={wurst}
        alt='a sausage in sunglasses smiling and giving the thumbs up'
      />
      </div>
      {children}
    </header>
  );
}

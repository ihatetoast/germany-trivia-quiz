import wurst from '../assets/sausage-5448952_1280.png';

import classes from './Header.module.css';

export default function Header({ topic }) {
  return (
    <header className={classes.header}>
      <div>
        <h1>German Trivia Quiz</h1>
        <p>{`Test your knowledge on ${topic}`}</p>
      </div>
      <img
        className={classes.image}
        src={wurst}
        alt='a sausage in sunglasses smiling and giving the thumbs up'
      />
    </header>
  );
}

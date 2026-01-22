
import classes from './Header.module.css';
// handle the image. pass from App?
export default function Header({ topic, image, imageAlt}) {
  return (
    <header className={classes.header}>
      <div>
        <h1>German Trivia Quiz</h1>
        <p>{`Test your knowledge on ${topic}`}</p>
      </div>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={image}
          alt={imageAlt}
        />
      </div>
    </header>
  );
}

const TimeSelect = ({ onSelect }) => {
// REMOVE suppressHydrationWarning. or not. building own select soon
  // https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select
  return (
    <div className="timer-select-container">
      <label htmlFor='time-select'>Select a difficulty level</label>
      <select suppressHydrationWarning
        id='time-select'
        onChange={(e) => onSelect(e.target.value)}
      >
        <button>
          <selectedcontent suppressHydrationWarning></selectedcontent>
        </button>
        <option value="">Please select a difficulty level</option>
        <option value='0'>
          <span className="option-icon" aria-hidden='true'>
            💤
          </span>
          <span className="option-value">Untimed</span>
        </option>
        <option value='15'>
          <span className="option-icon" aria-hidden='true'>
            🐌
          </span>
          <span className="option-value">Easy</span>
        </option>
        <option value='10'>
          <span className="option-icon" aria-hidden='true'>
            🐈
          </span>
          <span className="option-value">Medium</span>
        </option>
        <option value='5'>
          <span className="option-icon" aria-hidden='true'>
            🏇🏽
          </span>
          <span className="option-value">Hard</span>
        </option>
        <option value='100'>
          <span className="option-icon" aria-hidden='true'>
            🏇🏽
          </span>
          <span className="option-value">testing</span>
        </option>
      </select>
    </div>
  );
};

export default TimeSelect;

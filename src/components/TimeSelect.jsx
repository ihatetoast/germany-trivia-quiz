const TimeSelect = ({ onSelect }) => {
  return (
    <div className="timer-select-container">
      <label htmlFor='time-select'>Select a difficulty level</label>
      <select
        id='time-select'
        onChange={(e) => onSelect(e.target.value)}
      >
        <button>
          <selectedcontent></selectedcontent>
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
      </select>
    </div>
  );
};

export default TimeSelect;

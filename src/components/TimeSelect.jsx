import { Icon, Turtle } from 'lucide-react';
import { wavesSharkFin, unicornHead, lemon, sausage  } from '@lucide/lab';


import { useEffect, useState, useRef } from 'react';

import Button from './Button';

import classes from './TimeSelect.module.css';

const TimeSelect = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const dropdownRef = useRef(false);

  const options = [
    { value: '0', icon: <Icon iconNode={unicornHead}  className={classes.icon} color="#00A3A3" />, label: 'Untimed and chill' },
    { value: '20', icon: <Icon iconNode={lemon} className={classes.icon} color="#B38F00"/>, label: 'Easy peasy lemon squeezy' },
    { value: '10', icon: <Icon iconNode={sausage} className={classes.icon} color="#894f02" />, label: 'Not too fast. Not too slow.' },
    { value: '5', icon: <Icon iconNode={wavesSharkFin} className={classes.icon} color="#dd0000" />, label: 'Terrifying' },
  ];

  // if someone opens but doesn't choose (clicks off)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClickOutside); // all incl
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  function handleSelect(option) {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  }

  return (
    <div className={classes.timerselectContainer } ref={dropdownRef}>
      <p>Go easy without a timer or challenge yourself by choosing a time limit. If no choice is made, the default is untimed.</p>
      <label id='time-select-label'>Choose a difficulty level</label>
      <Button
        classes={classes.customSelectButton}
        aria-labelledby='time-select-label'
        handleClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        {selected ? (
          <>
            <span className={classes.optionIcon}>{selected.icon}</span>
            <span className={classes.optionLabel}>{selected.label}</span>
          </>
        ) : (
          'Choose level ...'
        )}
      </Button>
      {isOpen && (
        <ul className={classes.customSelectDropdown} role='listbox'>
          {options.map((option) => (
            <li
              key={option.value}
              className={classes.customSelectOption}
              onClick={() => handleSelect(option)}
              role='option'
              aria-selected={selected?.value === option.value}
            >
              <span aria-hidden='true'>
                {option.icon}
              </span>
              <span className={classes.optionLabel}>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSelect;

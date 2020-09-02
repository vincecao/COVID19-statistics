/*
ref: https://codesandbox.io/s/bulma-autocomplete-gm3pd?file=/src/index.js:169-579
*/

import React, { useEffect, useState } from 'react';

interface AutoCompleteProps {
  label: string;
  name: string;
  placeholder: string;
  data: any;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ label = '', name = '', placeholder = '', data = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [matches, setMatch] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(false);

  const handleKeyPress = (event) => {
    switch (event.which) {
      case 13: // Enter key
        if (matches.length) {
          setActiveIndex(0);
          setMatch([]);
          setQuery(matches[activeIndex]);
          setSelected(true);
        }
        break;
      case 38: // Up arrow
        setActiveIndex(activeIndex >= 1 ? activeIndex - 1 : 0);
        break;
      case 40: // Down arrow
        setActiveIndex(activeIndex < matches.length - 1 ? activeIndex + 1 : matches.length - 1);
        break;
      default:
        break;
    }
  };

  const handleSelection = (event, selection) => {
    event.preventDefault();

    setActiveIndex(0);
    setMatch([]);
    setQuery(selection);
    setSelected(true);
  };

  const updateQuery = (e) => {
    if (!selected) {
      const query = e.target.value;
      setMatch(query.length >= 2 ? data.filter((item) => item.toUpperCase().indexOf(query.toUpperCase()) >= 0) : []);
      setQuery(query);
    } else {
      if (e.nativeEvent.inputType === 'deleteContentBackward') {
        setMatch([]);
        setQuery('');
        setSelected(false);
      }
    }
  };

  return (
    <>
      {/* <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input className="input" type="email" placeholder="Email" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div> */}
      <div className="field has-addons has-addons-centered">
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="control">
          <div className={`dropdown ${matches.length > 0 ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <input
                type="text"
                className="input"
                name={name}
                value={query}
                onChange={updateQuery}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
              />
            </div>
            <div className="dropdown-menu">
              {matches.length > 0 && (
                <div className="dropdown-content">
                  {matches.map((match, index) => (
                    <a
                      className={`dropdown-item ${index === activeIndex ? 'is-active' : ''}`}
                      href="/"
                      key={match}
                      onClick={(event) => handleSelection(event, match)}
                    >
                      {match}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="control">
          <a className="button is-info">Search</a>
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Badge from '../Badge';
import List from '../List';

import closeSvg from '../../assets/img/close.svg';

import './addList.scss';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addNewList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }

    setIsLoading(true);

    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добваить список',
          },
        ]}
        isRemovable={false}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img src={closeSvg} alt="close" className="add-list__popup-close-btn" onClick={onClose} />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__colors">
            {colors.map((color) => (
              <Badge
                className={selectedColor === color.id && 'active'}
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
              />
            ))}
          </div>
          <button onClick={addNewList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;

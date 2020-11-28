import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';
import removeSvg from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, i) => (
        <li
          className={classNames(item.className, { active: item.active })}
          key={`${item.name}_${i}`}>
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>

          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;

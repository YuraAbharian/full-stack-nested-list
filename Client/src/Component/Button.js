import React from 'react';
const Buttons = props => {
  const { item, removeList, moveDown, moveUp, addSubList, removeSublist, index, list } = props;
  return (
    <div>
      <span>
        <button onClick={removeList}>Remove</button>
        {index > 0 ? <button onClick={moveUp}>up</button> : null}
        {index !== list - 1 ? <button onClick={moveDown}>down</button> : null}
        {!item ? <button onClick={addSubList}>addSublist</button> : null}
        {item ? <button onClick={removeSublist}>removeSublist</button> : null}
      </span>
    </div>
  );
};

export default Buttons;

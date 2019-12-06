import React, { useState, useEffect } from 'react';
import List from './List';
import { Request } from '../../api/api';
import {
  addList,
  AddSublist,
  MoveDown,
  MoveUp,
  removeList,
  RemoveSublist,
} from '../../Helper/Functions';

const ListContainer = props => {
  const [list, setList] = useState({
    localData: [],
  });

  useEffect(() => {
    if (props.listId) {
      Request.getData(props.listId).then(res => setList({ ...list, localData: res.data }));
    }
  }, []);

  return (
    <div>
      <List
        moveUp={MoveUp}
        moveDown={MoveDown}
        removeList={removeList}
        addList={addList}
        removeSublist={RemoveSublist}
        setList={setList}
        addSublist={AddSublist}
        list={list}
        listId={props.listId}
      />
    </div>
  );
};

export default ListContainer;

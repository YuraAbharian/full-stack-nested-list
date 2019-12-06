import React from 'react';
import AddField from '../../Helper/AddField';
import Buttons from '../Button';
import ListContainer from './ListContainer';
import './ListStyle.css';
const List = props => {
  const {
    list,
    addList,
    listId,
    moveDown,
    moveUp,
    removeList,
    addSublist,
    removeSublist,
    setList,
  } = props;

  return (
    <div>
      <div className='main'>
        <ul>
          {list.localData &&
            list.localData
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <li key={item._id}>
                  <div>{item.message}</div>
                  <Buttons
                    removeList={() => removeList(item._id, item.position, setList, list)}
                    moveUp={() =>
                      moveUp(list.localData, item.position, item.position - 1, setList, list)
                    }
                    moveDown={() =>
                      moveDown(list.localData, item.position, item.position + 1, setList, list)
                    }
                    addSubList={() => addSublist(item._id, setList, list)}
                    removeSublist={() => removeSublist(item._id, setList, list)}
                    item={item.showSublist}
                    index={index}
                    list={list.localData.length}
                  />
                  {item.showSublist ? <ListContainer listId={item.subListId} /> : null}
                </li>
              ))}
        </ul>
      </div>

      <AddField addList={addList} list={list} setList={setList} listId={listId} />
    </div>
  );
};

export default List;

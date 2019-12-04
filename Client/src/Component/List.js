import React, { useEffect,useContext, useState } from "react"; 
import AddField from "../Helper/AddField";
import Buttons from "./Button"; 
import {Request} from '../api/api';
import{ ListContext } from '../Context/Context';
const List = props => {
   
  const [list, setList] = useState({ 
    localData: [],
    listId: "",
    subListId: ""
  });

  useEffect(() => {
    if (props.listId) {
      Request.getData(props.listId) 
        .then(data => setList({ ...list, localData: data.data })) 
    }
  }, []);
  // const {  AddSublist,RemoveSublist,addList, removeList, Move,MoveUp,MoveDown   } = useContext()
  const AddSublist =async (idToAddSublist) => {
    let newData = list.localData;
    let noteToAdd;
    newData.forEach(note => {
      if (note._id === idToAddSublist) {
        noteToAdd = note;
      }
    });
    noteToAdd.showSublist = true;
    setList({ ...list, localData: newData });
    const res = await Request.addSubList(idToAddSublist) 
        let noteToChange;
        list.localData.forEach(note => {
          if (note._id === idToAddSublist) {
            noteToChange = note;
          }
        });
        noteToChange.subListId = res.data;
        setList({ ...list, localData: list.localData }); 
       
  };
  const RemoveSublist = idToRemoveSublist => { 
    let noteToChange;
    list.localData.forEach(note => {
      if (note._id === idToRemoveSublist) {
        noteToChange = note;
      }
    });
    noteToChange.showSublist = false;
    noteToChange.subListId = "";
    setList({ ...list, localData: list.localData });
    Request.removeSublist(idToRemoveSublist) 
  }; 
  const addList =async (note, listId) => {  
    let currentPositions = list.localData.map(note => note.position);
    let posToBeAdded = 0;
    while (currentPositions.includes(posToBeAdded)) {
      ++posToBeAdded;
    }  
      const res = await Request.add(note, posToBeAdded,listId ) 
          setList(state => ({
            ...list, 
            localData: [...state.localData, res.data]
          })); 
  }; 
  const removeList = (noteIdToDelete, notePositionToDelete) => {
    let notesObjToUpdate = list.localData.filter(
      note => note.position > notePositionToDelete
    );
    notesObjToUpdate.map(note => --note.position);

    setList({
      ...list,
      localData: list.localData.filter(note => note._id !== noteIdToDelete)
    });
    Request.remove(noteIdToDelete) 
    Request.update(notesObjToUpdate) 
  };
  const Move = (array, from, to) => { 
    const def = array[from].position
    array[from].position = array[to].position
    array[to].position = def; 
    Request.update(array);
    setList({ ...list, localData: array });      
  };
  const MoveUp = (array, from, to) => { 
    return Move(array, from, to);
  };
  const MoveDown = (array, from, to) => {
    return Move(array, from, to );
  };



  return (
    <div>
      <div style={{ display: "flex" }}>
        <ul
          style={{
            listStyle: "none",
            marginTop: "5px",
            justifyContent: "flex-end"
          }}
        >
          {list.localData &&
            list.localData
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <li key={item._id}>
                  <div>{item.message}</div>
                  <Buttons
                    item={item}
                    removeList={removeList}
                    MoveDown={MoveDown}
                    MoveUp={MoveUp}
                    AddSublist={AddSublist}
                    RemoveSublist={RemoveSublist}
                    index={index}
                    list={list}
                  />
                    {item.showSublist ? <List listId={item.subListId}/> : null} 
                </li>
              ))}
        </ul>
      </div>

      <AddField addList={addList} list={props.listId} />
    </div>
  );
};

export default List;

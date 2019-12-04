import React, { useEffect, useState } from "react";
import axios from "axios";
import AddField from "../Helper/AddField";
import Buttons from "./Button"; 

const List = props => {
 
  const [list, setList] = useState({ 
    localData: [],
    listId: "",
    subListId: ""
  });

  useEffect(() => {
    if (props.listId) {
      axios
        .get(`http://localhost:3001/${props.listId}`)
        .then(data => setList({ ...list, localData: data.data }))
        
    }
  }, []);

  const AddSublist = idToAddSublist => {
    let newData = list.localData;
    let noteToAdd;
    newData.forEach(note => {
      if (note._id === idToAddSublist) {
        noteToAdd = note;
      }
    });
    noteToAdd.showSublist = true;
    setList({ ...list, localData: newData });

    axios
      .post("http://localhost:3001/addSublist", {
        id: idToAddSublist
      })
      .then(res => { 
        let noteToChange;
        list.localData.forEach(note => {
          if (note._id === idToAddSublist) {
            noteToChange = note;
          }
        });
        noteToChange.subListId = res.data;
        setList({ ...list, localData: list.localData });
      })
       
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

    axios
      .post("http://localhost:3001/removeSublist", {
        id: idToRemoveSublist
      }) 
  };

  const addList = (note, listId) => {  
    let currentPositions = list.localData.map(note => note.position);
    let posToBeAdded = 0;
    while (currentPositions.includes(posToBeAdded)) {
      ++posToBeAdded;
    } 
      axios.post("http://localhost:3001/add", {
          message: note,
          position: posToBeAdded,
          showSublist: false,
          listId: listId,
          subListId: ""
        })
        .then(res => {
          setList(state => ({
            ...list,
            noteToAdd: "",
            localData: [...state.localData, res.data]
          }));
        })
        
    
  };

  const removeList = (noteIdToDelete, notePositionToDelete) => {
    let notesObjToUpdate = list.localData.filter(
      note => note.position > notePositionToDelete
    );
    notesObjToUpdate.map(note => --note.position);

    setList(state => ({
      ...list,
      localData: list.localData.filter(note => note._id !== noteIdToDelete)
    }));

    axios
      .delete("http://localhost:3001/delete", {
        data: {
          id: noteIdToDelete
        }
      })
       

    axios
      .post("http://localhost:3001/update", {
        objToUpd: notesObjToUpdate
      }) 
  };

  const Move = (array, from, to) => { 
    const def = array[from].position
    array[from].position = array[to].position
    array[to].position = def;

    axios.post("http://localhost:3001/update", {
        objToUpd: array
      })
      .then(() => {
        setList({ ...list, localData: array });
      });
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

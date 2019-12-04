import React, { useState, useEffect } from "react"; 

 

 
const AppContextProvider = props => {
 
    const [list, setList] = useState({
        noteToAdd: "",
        localData: [],
        listId: "",
        subListId: ""
      });
    
      useEffect(() => {
        if (props.listId) {
          axios
            .get(`http://localhost:3001/${props.listId}`)
            .then(data => setList({ ...list, localData: data.data }))
            .catch(err => console.log(err));
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
            let newData = list.localData;
            let noteToChange;
            newData.forEach(note => {
              if (note._id === idToAddSublist) {
                noteToChange = note;
              }
            });
            noteToChange.subListId = res.data;
            setList({ ...list, localData: newData });
          })
          .catch(err => console.log(err));
      };
    
      const RemoveSublist = idToRemoveSublist => {
        let newData = list.localData;
        let noteToChange;
        newData.forEach(note => {
          if (note._id === idToRemoveSublist) {
            noteToChange = note;
          }
        });
        noteToChange.showSublist = false;
        noteToChange.subListId = "";
        setList({ ...list, localData: newData });
    
        axios
          .post("http://localhost:3001/removeSublist", {
            id: idToRemoveSublist
          })
          .then(() => {})
          .catch(err => console.log(err));
      };
    
      const addList = (note, listId) => { 
        let notesArray = list.localData;
        let currentPositions = notesArray.map(note => note.position);
        let posToBeAdded = 0;
        while (currentPositions.includes(posToBeAdded)) {
          ++posToBeAdded;
        }
    
        if (note !== "") {
          axios
            .post("http://localhost:3001/add", {
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
            .catch(error => console.error(error));
        }
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
          .then(() => {})
          .catch(error => console.error(error));
    
        axios
          .post("http://localhost:3001/update", {
            objToUpd: notesObjToUpdate
          })
          .then(() => {})
          .catch(error => console.error(error));
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
    <ListContext.Provider value={{ list,  removeList, MoveDown, MoveUp,  AddSublist,RemoveSublist , addList   }  }>
      {props.children}
    </ListContext.Provider>
  );
};

export default AppContextProvider;
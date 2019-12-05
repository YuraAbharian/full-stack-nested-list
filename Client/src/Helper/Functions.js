import {Request} from "../api/api";

export const AddSublist =async (addSublistId,setList, list) => {
    let newData = list.localData;
    let addedItem;
    newData.forEach(note => {
        if (note._id === addSublistId) {
            addedItem = note;
        }
    });
    addedItem.showSublist = true;
    setList({ ...list, localData: newData });
    const res = await Request.addSubList(addSublistId);
    let noteToChange;
    list.localData.forEach(note => {
        if (note._id === addSublistId) {
            noteToChange = note;
        }
    });
    noteToChange.subListId = res.data;
    setList({ ...list, localData: list.localData });

};
// remove sublist
export const RemoveSublist =( removeSublistId, setList, list )=> {
    let changeItem;
    list.localData.forEach(note => {
        if (note._id === removeSublistId) {
            changeItem = note;
        }
    });
    changeItem.showSublist = false;
    changeItem.subListId = "";
    setList({ ...list, localData: list.localData });
    Request.removeSublist(removeSublistId)
};

// add list
export const addList =async (note, listId, setList, list) => { 
    const currentPositions = list.localData.map(note => note.position);
    let addedPos = 0;
    while (currentPositions.includes(addedPos)) {
        ++addedPos;
    }
    const res = await Request.add(note, addedPos,listId );
    setList(state => ({
        ...list,
        localData: [...state.localData, res.data]
    }));
};
// remove list
export const removeList = (itemIdToDelete, posToDel,setList, list) => {
    const ObjToUpdate = list.localData.filter(
        note => note.position > posToDel
    );
    ObjToUpdate.map(note => --note.position);
    setList({
        ...list,
        localData: list.localData.filter(note => note._id !== itemIdToDelete)
    });
    Request.remove(itemIdToDelete);
    Request.update(ObjToUpdate);
};
// mover
const Move = (array, from, to,setList, list ) => {
    const def = array[from].position;
    array[from].position = array[to].position;
    array[to].position = def;
    Request.update(array);
    setList({ ...list, localData: array });
};
// up
export const MoveUp = (array, from, to,setList, list) => {
    return Move(array, from, to,setList, list);
};
// down
export const MoveDown = (array, from, to,setList, list) => {
    return Move(array, from, to,setList, list );
};

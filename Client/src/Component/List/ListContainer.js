import React, {useState, useEffect} from 'react';
import List from "./List";
import {Request} from "../../api/api";
import {addList, AddSublist, MoveDown, MoveUp, removeList, RemoveSublist} from "../../Helper/Functions";

const ListContainer = (props) => {

    const [list, setList] = useState({
        localData: [],
        listId: "",
        subListId: ""
    });

    useEffect(() => {
        if (props.listId) {
            Request.getData(props.listId)
                .then(data =>console.log(data.data)|| setList({ ...list, localData: data.data }))
        }
    }, []);


    // add sublist
    const AddSublistBtn =async (addSublistId, setList, list) => {
       return AddSublist(addSublistId, setList, list);
           };
    // remove sublist
    const RemoveSublistBtn = (removeSublistId,setList,list) => {
      return  RemoveSublist(removeSublistId,setList,list)
       };
    // add list
    const addListBtn =async (note, listId) => {
       return addList(note, listId,setList, list)
    };
    // remove list
    const removeListBtn = (itemIdToDelete, posToDel, setList, list) => {
        return removeList(itemIdToDelete, posToDel, setList, list);
    };
    // up
    const MoveUpBtn = (array, from, to) => {
        return MoveUp(array, from, to,setList, list)
    };
    // down
    const MoveDownBtn = (array, from, to) => {
        return MoveDown(array, from, to,setList, list)
    };

    return (
        <div>
            <List  MoveUp={MoveUpBtn} MoveDown={MoveDownBtn} removeList={removeListBtn}
            addList={addListBtn} RemoveSublist={RemoveSublistBtn} setList={setList} AddSublist={AddSublistBtn} list={list} listId={props.listId} />
        </div>
    );
};

export default ListContainer;

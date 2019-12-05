import React   from 'react';
const Buttons = (props) => {
   const { item, removeList, MoveDown, MoveUp, AddSublist, RemoveSublist, index, setList, list } = props;
    return (
        <div>

            <span>
                <button onClick={()=> removeList(item._id, item.position, setList, list)}>Remove</button>
                {index > 0 ? (
                    <button onClick={()=>MoveUp(list.localData, item.position, item.position-1,setList, list)} >up</button>
                ) : null}
                {index !== list.localData.length - 1 ? (
                    <button onClick={()=>MoveDown(list.localData, item.position, item.position +1,setList, list)} >down</button>
                ) : null}
                {!item.showSublist ? (
                    <button onClick={()=>AddSublist(item._id,setList, list)}>addSublist</button>
                ) : null}
                {item.showSublist ? <button onClick={()=>RemoveSublist(item._id, setList, list)}>removeSublist</button> : null}
            </span>
        </div>
    );
};

export default Buttons;

import React   from 'react'; 
const Buttons = (props) => {    
   const { item, removeList, MoveDown, MoveUp, AddSublist, RemoveSublist, index, list } = props;
    return (
        <div>
         
            <span>
                <button onClick={()=> removeList(item._id, item.position)}>Remove</button>
                {index > 0 ? (
                    <button onClick={()=>MoveUp(list.localData, item.position, item.position-1)} >up</button>
                ) : null}
                {index !== list.localData.length - 1 ? (
                    <button onClick={()=>MoveDown(list.localData, item.position, item.position +1)} >down</button>
                ) : null}
                {!item.showSublist ? (
                    <button onClick={()=>AddSublist(item._id)}>addSublist</button>
                ) : null}
                {item.showSublist ? <button onClick={()=>RemoveSublist(item._id)}>removeSublist</button> : null} 
            </span>
        </div>
    );
};

export default Buttons;
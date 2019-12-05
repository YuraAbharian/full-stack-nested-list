import React from "react";
import AddField from "../../Helper/AddField";
import Buttons from "../Button";
import ListContainer from "./ListContainer";
const List = props => {

const {  list,  addList, listId , setList  } = props;

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
                    {...props}
                    index={index}
                  />
                    {item.showSublist ? <ListContainer listId={item.subListId}/> : null}
                </li>
              ))}
        </ul>
      </div>

      <AddField addList={addList} list={list} setList={setList} listId={listId} />
    </div>
  );
};

export default List;

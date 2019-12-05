import React  from 'react';

const AddField = ({addList,listId ,  setList, list}) => {
    const [value, setValue] = React.useState("");  
    const handlerSubmit = e => {
        e.preventDefault();  
        if (!value) return; 
        addList(value, listId,  setList, list);
        setValue("");
    };


    return (
       <div style={{marginTop: "5px"}}>
           <form onSubmit={handlerSubmit}>
               <input  type="text"  value={value}   onChange={e => setValue(e.target.value)}  />
               <button>ADD</button>
           </form>
       </div>
    );
};


export default AddField;
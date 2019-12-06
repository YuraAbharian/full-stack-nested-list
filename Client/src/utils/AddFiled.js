import React  from 'react';

export default ({addListThunk , task:{ ItemID, listID, localTaskData  }}) => {
    const [value, setValue] = React.useState("");

    const handlerSubmit = e => {
        let currPos = localTaskData.map(item => item.pos);
        let pos = 0;
        while (currPos.includes(pos)) {++pos}
        e.preventDefault();
        if (!value) return;
        addListThunk(value ,pos, listID, ItemID);
        setValue("");
    };


    return (
       <div style={{marginTop: "5px"}}>
           <form onSubmit={handlerSubmit}>
               <input
                   type="text"
                   value={value}
                   onChange={e => setValue(e.target.value)}
               />
               <button>ADD</button>
           </form>
       </div>
    );
};


 

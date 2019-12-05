import React, { useState, useEffect }  from 'react';
import ListContainer from './Component/List/ListContainer'; 
import {Request} from "./api/api";


const  App=()=> {
const [list, setListId] = useState({id: 0, show: false})
      useEffect(()=>{
        Request.getNewList()
        .then(res=>setListId({id: res.data, show: true}))  
      },[])
  
    return (     <div>
      {list.show &&  <ListContainer setListId={setListId} listId={list.id} /> }
    </div>
     
  );
  
  
};

export default App;


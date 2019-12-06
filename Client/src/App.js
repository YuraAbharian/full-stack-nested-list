import React, { useState, useEffect } from 'react';
import ListContainer from './Component/List/ListContainer';
import { Request } from './api/api';

const App = () => {
  const [list, setListId] = useState({ id: null });

  useEffect(() => {
    Request.getNewList().then(res => setListId({ id: res.data }));
  }, []);

  return <div>{list.id && <ListContainer setListId={setListId} listId={list.id} />}</div>;
};

export default App;

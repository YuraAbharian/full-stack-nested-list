import axios from 'axios';

const instance = axios.create({
    baseURL:"http://localhost:3001/"
});
export const Request = {

        remove:(id)=>{
          return instance.delete("delete", {
        data: { id  }
      })
        },
        update:(objToUpd)=>{
          return instance.post("update", {
              objToUpd
            })
        },
        add:(note,pos, listId )=>{
         return instance.post("add", {
            message: note,
            position: pos,
            showSublist: false,
            listId: listId,
            subListId: ""
          })
        },
        removeSublist:(id)=>{
          return instance.post("removeSublist", {  id  })
        },
        addSubList:(id)=>{
          return  instance.post("addSublist", { id })
        },
        getData:(listId) => {

          return  instance.get(`${listId}`)
        }
};

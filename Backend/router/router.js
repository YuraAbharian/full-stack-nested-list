const router = require("express").Router();
const List = require("../model/list.model.js");
const Item = require("../model/item.model.js");
const mongoose = require("mongoose");

router.get("/:listId", async (req, res) => {
  const { listId } = { ...req.params };

    const list = await List.findById(listId);
    try {
          if(!list) {

              await List.create({
                  "_id": "56cb91bdc3464f14678934ca",
                  "ancestors": [],
                  "parent": "",
              });
          }

        const item =await Item.find({ parent: listId });
        res.json(item);
    } catch (e) {
        console.log("error")

    } 

});

router.post("/add", async (req, res) => {
  const  { message, showSublist,subListId, listId }= req.body;
  if(!listId) return console.log('No listId');
  const position = Number(req.body.position);
  const datas =await List.findById(listId);
     try {
      const newData =  new Item({
        message,
        position,
        parent: listId,
        showSublist,
        ancestors: [...datas.ancestors, listId],
        subListId
      });
    const notes = await  newData.save();

            res.json(notes);
     } catch (err) {
        res.send();
     }

});

router.post("/addSublist",async (req, res) => {
  const { id } = req.body;
  // if no id
  if(!id) return console.log('No id');

 const datas =await Item.findById(id);
 try {
  const newList = new List({
    parent: id,
    ancestors: [...datas.ancestors, id]
  });
const note = await newList.save();
    await  Item.findOne({ _id: id }, (err, item) =>{
        item.subListId = note._id;
        item.showSublist = !item.showSublist;
        item.save();
      });
      res.send(note._id);
 } catch (err) {
  res.send();
 }

});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
    await Item.findByIdAndDelete(id);
    await List.deleteMany({ancestors: id});
    await  Item.deleteMany({ancestors: id})

});

router.post("/update", async (req, res) => {
  const { objToUpd } = await req.body;
try {
        objToUpd.forEach(async (obj) => {
        const item = await Item.findByIdAndUpdate(obj._id);
          item.position = obj.position;
           await item.save()

  })
  res.json("Updated")
} catch (e) {
      res.status(400).json("Error: " + e);
}

});

router.post("/removeSublist",async (req, res) => {
  const { id } = req.body;
       try {
        await List.deleteMany({ancestors: id});
        await Item.deleteMany({ancestors: id}) ;
        const item = await  Item.findByIdAndUpdate(id);
           item.showSublist = false;
           item.subListId = "";
           await item.save();
       }  catch (e) {
          res.json(e)
       }
});

module.exports = router;


// {
//     "_id" : ObjectId("5de619eb508ae823bbd3a657"),
//     "ancestors" : [],
//     "parent" : "",
//     "__v" : 0
// }

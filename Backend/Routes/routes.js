const express = require("express");
const router = new express.Router();
const List = require("../models/parentSchema");
const Item = require('../models/childrenSchema');

const move = (from, to)=>{
  const def = from.pos;
  from.pos = to.pos;
  to.pos = def;
};
// get
router.get('/list/:listId', async (req, res)=>{
        const { listId } = { ...req.params };
        const items = await Item.find({ parent: listId });
        if(!items) throw new Error('No Lists');
        try{
            res.status(200).json(items);
        } catch (e){
            res.status(400).json(e)
        }
});
// add item
router.post('/list',  (req, res)=> {
    const { text, pos, listId, itemId } = req.body;
    List.findById(listId)
        .then(list => {
            const newItem = new Item({
                text,
                pos: Number(pos),
                parent: listId,
                ancestors: [...list.ancestors, listId],
                itemId
            });
            newItem
                .save()
                .then(item => {
                    return res.json(item);
                })
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));

});
// remove item
router.delete("/delete/:id",async (req, res) => {
    const {id} = await req.params;
    if(!id) throw new Error('No id');
    try {
          await Item.findByIdAndDelete(id);
          await List.deleteMany({ancestors: id});
          await Item.deleteMany({ancestors: id});
        res.json('Delete')
    } catch (e) {
         res.json(e || e.message)
    }

});
// update position after remove
router.put("/update", async (req, res) => {
    const { updObj  } = await req.body;
    updObj.forEach( async obj => {
        const item = await Item.findByIdAndUpdate(obj._id);
        try{
            item.pos = obj.pos;
            item.save();
        }catch(e){
            throw new Error(e.message)
        }
    });
    res.json('Updated')
});
// change position
router.put("/position", async (req, res) => {
    const { updObjOne, updObjTwo  } = await req.body;
        const from = await Item.findByIdAndUpdate(updObjOne._id);
        const to = await Item.findByIdAndUpdate(updObjTwo._id);
        try{
            await move(from, to);
             from.save();
             to.save();
        }catch(e){
            throw new Error(e.message)
        }

    res.json('Updated')
});

// add sublist
router.post("/list/sublist",(req, res) => {
    const { subListId } = req.body;
    Item.findById(subListId)
        .then(items => {
            const newList = new List({
                parent: subListId,
                ancestors: [...items.ancestors, subListId]
            });
                newList
                    .save()
                    .then(response => {
                        Item.findOne({ _id: subListId }, (err, item)=> {
                            item.itemId = response._id;
                            item.showSublistField = !item.showSublistField;
                            item.save();
                        });
                        res.send(response._id);
                    })
                    .catch(e => res.status(400).json("Error: " + e));
        })
        .catch(e => res.status(400).json("Error: " + e));
});

module.exports = router; 
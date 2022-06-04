const router = require("express").Router();
const path = require("path")
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

router.post("/notes", (req,res) =>{
    const currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    const parse = JSON.parse(currentSaves)
    const newSaves = [...parse, {title: req.body.title, text:req.body.text, id: uuidv4()}];

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(newSaves))
    res.send(newSaves)
});

router.get("/notes", (req,res) =>{
    const currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    const parse = JSON.parse(currentSaves)

    res.send(parse)
});

router.delete("/notes/:id", (req,res) =>{
    const currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    const parse = JSON.parse(currentSaves)

    var notes = parse.filter(note => {
        return note.id !== req.params.id
    })

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(notes))
    res.send({ ok:true })
})

module.exports = router
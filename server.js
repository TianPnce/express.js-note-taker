const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./Develop/db/db.json');

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
)

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'notes.html'))
);

app.get('*', (req, res) => 
 res.sendFile(path.join(__dirname,'index.html'))
)

app.get('./api/notes', (req, res) => {
  fs.readFile('./Develop/db/db.json', (err, data) => {
    if (err){
      console.log(err);
    }else {
      const noteData = JSON.parse(data);
      noteData.push(newNote);
      writeFile('./Develop/db/db.json',noteData)
    }
  })
})

app.post('./api/notes', (req, res) => {
  const newNote = req.body
  newNote.id = uuidv4()
  noteData.push(newNote)
  fs.writeFile('./Develop/db/db.json', JSON.stringify(noteData))
  res.json(noteData)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
)
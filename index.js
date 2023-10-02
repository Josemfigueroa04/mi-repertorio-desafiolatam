const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/canciones', (req, res) => {

    let data = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    data.push(req.body);
    fs.writeFileSync('repositorio.json', JSON.stringify(data), 'utf-8');
    res.send(req.body);
});

app.get('/canciones', (req, res) => {
    let data = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    res.send(data);
});

app.put('/canciones/:id', (req, res) => {
    let {id} = req.params;
    let data = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    let index = data.findIndex((e) => e.id == id);
    data[index] = req.body;
    fs.writeFileSync('repositorio.json', JSON.stringify(data), 'utf-8');
    res.json(req.body);
});

app.delete('/canciones/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('repositorio.json', 'utf-8'));
    let id = req.params.id;
    let index = data.findIndex((e) => e.id == id);
    data.splice(index, 1);
    fs.writeFileSync('./repositorio.json', JSON.stringify(data), 'utf-8');
    res.json({ message: 'Cancion eliminada' });
});

const express = require('express');
const app = express();
const multer = require('./src/config/multer');
const bodyParser = require('body-parser');
const pug = require('pug');
const { getFilesList, deleteFile } = require('./src/utils/fs');

// carrega o arquivo template e retorna uma função
const templateCompiled = pug.compileFile('./src/template/index.pug');

// torna a pasta public pública
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const html = templateCompiled({
        files: getFilesList()
    })
    res.send(html)
});

app.post('/', multer, (req, res) => {
    const html = templateCompiled({
        files: getFilesList()
    })
    res.send(html)
});

app.delete('/', (req, res) => {
    const {ok, error} = deleteFile(req.body.filename)
    return ok? res.json({ok}): res.status(501).json({error})
})

app.listen(process.env.PORT || 3000);

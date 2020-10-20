const fs = require('fs');
const path = require('path');

function getFilesList() {
    let filesList = [];
    const fileDirPath = path.resolve(__dirname, "..", "..", 'public', 'files');
    try {
        filesList = fs.readdirSync(fileDirPath);
    } catch (err) {
        console.log(err)
    }
    console.log(filesList)
    return filesList;
}

function deleteFile(filename) {
    const filePath = path.resolve(__dirname, "..", "..", 'public', 'files', filename);
    try{
        fs.unlinkSync(filePath);
    }catch(error){
        return {ok:false, error}
    }
    return {ok: true, error: null}
    
}

module.exports = {getFilesList, deleteFile}
const multer = require('multer');
const shortid = require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files')
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

module.exports = multer({storage}).array('files', 10)
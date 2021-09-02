const path = require("path")
const uploadRouter = require("express").Router();
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function(req, file, cb){

        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes  = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) /*return true/false on matchnames being provided on 'filetypes'*/
    const mimetype = filetypes.test(file.mimetype) /*checking the mimetype ex: "image/jpeg"*/

    if(extname && mimetype) {

        return cb(null, true)

    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
    
})  //pass in as the middleware to the route

uploadRouter.route("/upload").post(upload.single("image"), (req, res) => {
  res.send(`/${escape(req.file.path)}`);
});


module.exports = uploadRouter;

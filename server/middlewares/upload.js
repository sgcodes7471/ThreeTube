import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: function(req, file, callback){
      callback(null, './videos');
    },
    filename:function(req, file, cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
      const fileName = uniqueSuffix + path.extname(file.originalname);
      req.fileName = fileName;
      callback(null, fileName); 
    }
});
const upload = multer({storage:storage});

export default upload

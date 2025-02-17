import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) { // cb is callback
        cb(null, 'uploads/'); // null is for error 
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function fileFilter (req, file, cb) { 
    const filetypes = /jpe?g|png|webp/; 
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}
const upload = multer({
    storage, fileFilter
});
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`
        });
    });
});


export default router;
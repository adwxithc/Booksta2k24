import multer from 'multer';

// Configure multer to use in-memory storage and ignore unexpected fields
const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([{ name: 'post-images', maxCount: 10 }]);


export default upload;
const express = require('express');
const router = express.Router();
const {
    getAllGallery,
    getGalleryById,
    addGallery,
    updateGalleryOnId,
    deleteGalleryrOnId
} = require('../controller/galleryController');
const { upload } = require('../config/file-handler');

// routes for gallery
router.get('/', getAllGallery);
router.get('/id/:id?', getGalleryById);
router.post('/add', upload, addGallery);
router.put('/update/:id?', updateGalleryOnId);
router.delete('/delete/:id?', deleteGalleryrOnId);

module.exports = router;
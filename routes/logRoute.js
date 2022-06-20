const express = require('express');
const router = express.Router();
const {
    getAllLogs,
    getLogById
} = require('../controller/logController');

// routes for gallery
router.get('/', getAllLogs);
router.get('/id/:id?', getLogById);

module.exports = router;
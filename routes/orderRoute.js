const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrderOnId,
    deleteOrdernId
} = require('../controller/orderController');


// routes for order
router.get('/', getAllOrders);
router.get('/id/:id?', getOrderById);
router.post('/add', addOrder);
router.put('/update/:id?', updateOrderOnId);
router.delete('/delete/:id?', deleteOrdernId);

module.exports = router;
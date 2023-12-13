const express = require('express');
const router = express.Router();

router.get('/', (res, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched.'
    });
});

router.post('/', (res, res, next) => {
    res.status(201).json({
        message: 'Orders were created.'
    });
});

router.get('/:orderID', (res, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderID: req.params.orderID
    });
});

router.delete('/:orderID', (res, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderID: req.params.orderID
    });
});

module.exports = router;
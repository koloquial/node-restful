const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//handle incoming GET requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/products GET'
    });
});

//handle incoming POST requests
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))

    res.status(201).json({
        message: '/products POST',
        created: product
    });
});

//handle GET single product with id
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID.',
            id: id
        });
    }
});

//handle PATCH single product with id
router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product.'
    });
});

//handle DELTE single product with id
router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product.'
    });
});

module.exports = router;
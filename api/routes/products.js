const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//handle incoming GET requests
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
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
        console.log(result);
        res.status(201).json({
            message: '/products POST',
            created: product
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
});

//handle GET single product with id
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'No entry found.'})
        }
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
});

//handle PATCH single product with id
router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    console.log('update ops', updateOps)
    Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(res);
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
});

//handle DELTE single product with id
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID
    Product.remove({ _id: id })
    .exect()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
});

module.exports = router;
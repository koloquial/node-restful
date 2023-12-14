const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//handle incoming GET requests
router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${doc._id}`
                    }
                }
            })
        }
        res.status(200).json(response);
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
            created: {
                _id: result._id,
                name: result.name,
                price: result.price,
                request:{
                    type: 'GET',
                    url: `http://localhost:3000/products/${result._id}`
                }
            }
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
        updateOps[ops.keyName] = ops.value;
    }
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
    .exec()
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
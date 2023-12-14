const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
    .select('_id product quantity')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/orders/${doc._id}`
                    }
                }
            })
        });
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productID)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: "Product not found."
            })
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.productID,
            quantity: req.body.quantity
        })
    
        return order.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'Order stored.',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: `http://localhost:3000/orders/${result._id}`
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
});

router.get('/:orderID', (req, res, next) => {
    Order.findById(req.params.orderID)
    .select('_id product quantity')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: "Order not found."
            })
        }
        res.status(200).json({
            order: {
                _id: order._id,
                product: order.product,
                quantity: order.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000'
            }
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
});

router.delete('/:orderID', (req, res, next) => {
    Order.deleteOne({_id: req.params.orderID })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request:{
                type: 'POST',
                url: `http://localhost:3000/orders`,
                body: { productID: 'ID', quantity: 'Number'}
            }
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
});

module.exports = router;
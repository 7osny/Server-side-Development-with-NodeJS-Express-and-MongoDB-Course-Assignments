const express = require('express');
const bodyParser=require('body-parser');
const promotions = require('../models/Promotions');
const Promotions = require('../models/Promotions');
const promoRouter =	express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/')
.get((req,res,next) => {
    promotions.find({})
     .then((promo)=>{
         res.statusCode=200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promo);
     },(err)=>next(err))
     .catch((err)=>next(err));
 })
 .post((req, res, next) => {
     promotions.create(req.body)
     .then((promo)=>{
         res.statusCode=200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promo);
     },(err)=>next(err))
     .catch((err)=>next(err));
 })
 .put((req, res, next) => {
     res.statusCode = 403;
     res.end('PUT operation not supported on /promo');
 })
 .delete((req, res, next) => {
     promotions.remove({})
     .then((resp) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(resp);
     }, (err) => next(err))
     .catch((err) => next(err));    
 });
 
 promoRouter.route('/:promoId')
 .get((req,res,next) => {
     Promotions.findById(req.params.promoId)
     .then((promo) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promo);
     }, (err) => next(err))
     .catch((err) => next(err));
 })
 .post((req, res, next) => {
     res.statusCode = 403;
     res.end('POST operation not supported on /promo/'+ req.params.promoId);
 })
 .put((req, res, next) => {
     promotions.findByIdAndUpdate(req.params.promoId, {
         $set: req.body
     }, { new: true })
     .then((promo) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promo);
     }, (err) => next(err))
     .catch((err) => next(err));
 })
 .delete((req, res, next) => {
     promotions.findByIdAndRemove(req.params.promoId)
     .then((resp) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(resp);
     }, (err) => next(err))
     .catch((err) => next(err));
 });
module.exports=promoRouter;
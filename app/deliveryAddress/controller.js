const path = require('path');
const fs = require('fs');
const config = require("../config");
const DeliveryAddress = require('./model');
const { policyFor } = require('../../utils');
const { subject } = require('@casl/ability');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let dAddress = new DeliveryAddress({...payload, user: user._id});
    await dAddress.save();
    return res.json(dAddress)
      
  } catch(err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors
      })
    }

    next(err)
  }
}

const index = async (req, res, next) => {
  try {
    let Delivery = await DeliveryAddress.find();
    return res.json(Delivery);
  } catch(err) {
    next(err)      
  }   
}

const deleted = async (req, res) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectAddress = subject('DeliveryAddress', { ...address, user_id: address.user });
    let policy = policyFor(req.user);
    if (!policy.can('update', subjectAddress)) {
      return res.json({
        error: 1,
        message: 'Kon ga oleh ngedit'
      })
    }
    await DeliveryAddress.findOneAndDelete(id);
    return res.json({
      deleted: 1,
      id: req.params.id
    });

  } catch(err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectAddress = subject('DeliveryAddress', { ...address, user_id: address.user });
    let policy = policyFor(req.user);
    if (!policy.can('update', subjectAddress)) {
      return res.json({
        error: 1,
        message: 'Kon ga oleh ngedit'
      })
    }

    let Delivery = await DeliveryAddress.findByIdAndUpdate( id, payload, { new: true, runValidators: true })
    return res.json(Delivery)
  } catch(err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors
      })
    }

    next(err)
  }
}

module.exports = {
    index,
    store,
    update,
    deleted
}
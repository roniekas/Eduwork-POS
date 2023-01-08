const path = require('path');
const fs = require('fs');
const config = require("../config");
const Tags = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tags(payload);
    await tag.save();
    return res.json(tag)
      
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
    let tag = await Tags.find();
    return res.json(tag);
  } catch(err) {
    next(err)      
  }   
}

const deleted = async (req, res) => {
  try {
    await Tags.findOneAndDelete({ _id: req.params.id });
    
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
    let payload = req.body;
    let tag = await Tags.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    return res.json(tag)
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
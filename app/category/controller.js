const path = require('path');
const fs = require('fs');
const config = require("../config");
const Categories = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Categories(payload);
    await category.save();
    return res.json(category)
      
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
    let cat = await Categories.find();
    return res.json(cat);
  } catch(err) {
    next(err)      
  }   
}

const deleted = async (req, res) => {
  try {
    await Categories.findOneAndDelete({ _id: req.params.id });
    
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
    let category = await Categories.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    return res.json(category)
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
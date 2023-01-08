const path = require('path');
const fs = require('fs');
const config = require("../config");
const Product = require('./model');
const Category = require('../category/model');
const Tags = require('../tags/model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: new RegExp(payload.category, 'i') });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    if (payload.tags && payload.tags.length > 0 ) {
      let tags = await Tags.find({ name: { $in: payload.tags } });
      if (tags.length > 0) {
        let tag = tags.map(tag => tag._id)
        let objtag = Object.assign({}, tag)
        // console.log(objtag)
        payload = { ...payload, tags: tags.map(tag => tag._id) };
      } else {
        delete payload.tags;
      }
    }

    console.log(payload);

    if (req.file) {
      let tmpPath = req.file.path;
      let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let fileName = req.file.filename + "." + originaExt;
      let targetPath = path.resolve(config.rootPath, `public\\images\\products\\${fileName}`);
      
      const src = fs.createReadStream(tmpPath);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);
      
      src.on('end', async () => {
        try {
          let product = new Product({ ...payload, image_url: fileName });
          await product.save();
          return res.json(product);

        } catch (err) {
          fs.unlinkSync(targetPath);
          if (err && err.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors
            })
          }

          next(err)
        }
      });
      
      src.on('error', async () => {
        next(err);  
      })
    } else {
      let product = new Product(payload);
      product.save();
      return res.json(product);
    }
      
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
    let { skip = 0, limit = 0, q = '', category = '', tags = [] } = req.query;
    console.log(req.query);
    let criteria = {};
    if (q.length) {
      criteria = {
        ...criteria,
        name: new RegExp(q, 'i')
      }
    }
    if (category.length > 0) {
      let categoryr = await Category.findOne({ name: new RegExp(category, 'i') });
      if (categoryr) {
        criteria = {
          ...criteria, category: categoryr._id
        }
      }
    }
    if (tags.length > 0) {
      let tagr = await Tags.find({ name: { $in: tags } });
      if (tagr.length > 0) {
        criteria= {...criteria, tags: {$in: tagr.map(tag => tag._id)}}
      }
    }

    console.log(criteria);  
    let count = await Product.find().countDocuments();

    let product = await Product.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).populate('category').populate('tags');
    return res.json({
      data: product,
      count
    });
  } catch(err) {
    next(err)      
  }   
}

const deleted = async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });
    let currentImage = `${config.rootPath}\\public\\images\\products\\${product.image_url}`;
    if (fs.existsSync(currentImage)){
      fs.unlinkSync(currentImage);
    }
    res.status = 200
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
    let { id } = req.params;

    if (payload.category) {
      let category = await Category.findOne({ name: new RegExp(payload.category, 'i') });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    if (payload.tags && payload.tags.length > 0 ) {
      let tags = await Tags.find({ name: { $in: payload.tags } });
      if (tags.length > 0) {
        payload = { ...payload, tags: tags.map(tag => tag._id) };
      } else {
        delete payload.tags;
      }
    }
    console.log(payload);
    if (req.file) {
      let tmpPath = req.file.path;
      let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let fileName = req.file.filename + "." + originaExt;
      let targetPath = path.resolve(config.rootPath, `public\\images\\products\\${fileName}`);
      
      const src = fs.createReadStream(tmpPath);
      const dest = fs.createWriteStream(targetPath);
      src.pipe(dest);
      
      src.on('end', async () => {
        try {
          let product = await Product.findById(id);
          let currentImage = `${config.rootPath}\\public\\images\\products\\${product.image_url}`;
          if (fs.existsSync(currentImage)){
            fs.unlinkSync(currentImage);
          }
          product = await Product.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
          });

          return res.json(product);

        } catch (err) {
          fs.unlinkSync(targetPath);
          if (err && err.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors
            })
          }

          next(err)
        }
      });
      
      src.on('error', async () => {
        next(err);  
      })
    } else {
      let product = Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
      });
      return res.json(product);
    }
      
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
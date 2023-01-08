const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const ProductSchema = Schema({
  name: {
      type: String,
      required: [true, 'Please add a name'],
      minLength: [3, 'Min 3 karakter cuk!'],
      maxLength: [50, 'Max 50 Karakter cuk!']
  },
  description: {
    type: String,
    maxlength: [1000, "maximal 1000 Karakter cuk!"]
  },
  price: {
    type: Number,
    default: 0
  },
  image_url: {
      type: String
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tags'
    }
  ]
}, {timestamps: true});

module.exports = model('Product', ProductSchema);
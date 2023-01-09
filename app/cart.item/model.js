const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let cartItemSchema = Schema({
  nama: {
    type: String,
    minLength: [5, 'min 5'],
    required: [true, 'ini di perlukan']
  },
  qty: {
    type: Number,
    minLength: [1, 'min 1'],
    required: [true, 'ini di perlukan']
  },
  price: {
    type: Number,
    default: 0  
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref:'Product'
  }
}, {timestamps: true})

module.exports = model('CartItem', cartItemSchema)
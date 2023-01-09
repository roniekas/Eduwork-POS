const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, 'namane minimal 5 karakter'],
    required: [true, 'nama iku perlu']
  },

  price: {
    type: Number,
    required: [true, 'Harga item iku perlu']
  },

  qty: {
    type: Number,
    required: [true, 'Kuantiti ne piro']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
});

module.exports = model('OrderItem', orderItemSchema)
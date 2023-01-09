const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let deliveryAddressSchema = Schema({
  nama: {
    type: String,
    maxLength: [255, 'Max 255'],
    required: [true, 'ini di perlukan']
  },
  kelurahan: {
    type: String,
    maxLength: [255, 'Max 255'],
    required: [true, 'ini di perlukan']
  },
  kecamatan: {
    type: String,
    maxLength: [255, 'Max 255'],
    required: [true, 'ini di perlukan']
  },
  kabupaten: {
    type: String,
    maxLength: [255, 'Max 255'],
    required: [true, 'ini di perlukan']
  },
  provinsi: {
    type: String,
    maxLength: [255, 'Max 255'],
    required: [true, 'ini di perlukan']
  },
  detail: {
    type: String,
    maxLength: [1000, 'Max 1000'],
    required: [true, 'ini di perlukan']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'user'
  }
}, {timestamps: true})

module.exports = model('DeliveryAddress', deliveryAddressSchema)
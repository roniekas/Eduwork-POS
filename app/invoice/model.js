const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const invoiceSchema = Schema({
  sub_total: {
    type: Number,
    required: [true, 'total kudu di isi']
  },
  delivery_fee: {
    type: Number,
    required: [true, 'ongkose piro']
  },
  devlivery_address: {
    provinsi: { type: String, required: [true, 'Provinsine ndi'] },
    kabupaten: { type: String, required: [true, 'kabupatenne ndi'] },
    kecamatan: { type: String, required: [true, 'kecamatane ndi'] },
    kelurahan: { type: String, required: [true, 'kelurahane ndi'] },
    detail: { type: String }
  },
  total: {
    type: Number,
    required: [true, 'totale piro']
  },
  payment_status: {
    type: String,
    enum: ['waiting_payment', 'paid'],
    default: 'waiting_payment'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
}, { timestamps: true });

module.exports = model('Invoice', invoiceSchema)
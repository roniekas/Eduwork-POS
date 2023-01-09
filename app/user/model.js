const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let usersSchema = Schema({
  full_name: {
    type: String,
    required: [true, 'Ga boleh kosong ya!'],
    minLength: [3, 'Minimal 3 Karakter ya!'],
    maxLength: [255, 'Maximal 255 Karakter ya!']
  },
  customer_id: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'Email nya ga boleh kosong ya!'],
    maxLength: [255, 'Maximal 255 Karakter ya!']
  },
  password: {
    type: String,
    required: [true, 'Password nya ga boleh kosong ya!'],
    maxLength: [255, 'Maximal 255 Karakter ya!']

  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  token: [String]
}, { timeStamp: true });

usersSchema.path('email').validate(function (value) {
  const Regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return Regex.test(value);
}, attr => `${attr.value} email lu kayanya ga valid ?`);

usersSchema.path('email').validate(async function (value) {
  try {
    const count = await this.model('User').count({ email: value });
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} kayae emaillu udh kedaftar deh`);

const HASH_ROUND = 10;
usersSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next()
});

usersSchema.plugin(AutoIncrement, {inc_field: 'customer_id'})



module.exports = model('User', usersSchema)
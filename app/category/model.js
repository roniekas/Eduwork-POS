const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, 'Min 3'],
    maxLength: [20, 'Max 20'],
    required: [true, 'ini di perlukan']
  }
})

module.exports = model('Category', categorySchema)
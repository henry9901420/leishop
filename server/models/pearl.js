const mongoose = require('mongoose')
const Schema = mongoose.Schema

let pearlSchema = new Schema({
    pearlId: mongoose.SchemaTypes.ObjectId,
    name: {type: String, required: true },
    description: {type: String },
    image: {type: String},
    size: {type: Number, default: 0},
    amount: {type: Number, default: 0 },
    sellprice: {type: Number, default: 0 },
    sourceprice: {type: Number, default: 0 },
    barcode: {type: Number, default: 0 },
    notes: { type: String, default: ''},
    createdOn: {type: Date, default: Date.now }
})
const Pearl = mongoose.model('pearl', pearlSchema)

module.exports = Pearl
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let jewellerySchema = new Schema({
    jewellweyId: mongoose.SchemaTypes.ObjectId,
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
const Jewellery = mongoose.model('jewellery', jewellerySchema)

module.exports = Jewellery
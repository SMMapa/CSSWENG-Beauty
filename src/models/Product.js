const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: { type: String, required: true, unique: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand_name: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    sku: { type: String, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock_qty: { type: Number, required: true, min: 0 },
    image_url: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
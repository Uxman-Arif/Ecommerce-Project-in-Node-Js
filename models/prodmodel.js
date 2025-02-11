const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stk_available: {
        type: Number,
        required: true,
    },
    prodImg: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'userregister',
    }
}, {timestamps:true});

const prodModel = mongoose.model('product', prodSchema);

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    tiem: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'userregister',
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
    },
});

const reviewModel = mongoose.model('prodreviews', reviewSchema);

module.exports = {
    prodModel,
    reviewModel,
}
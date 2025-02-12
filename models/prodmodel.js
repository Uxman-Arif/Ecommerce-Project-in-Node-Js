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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userregister',
    }
}, {timestamps:true});

const prodModel = mongoose.model('product', prodSchema);

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userregister',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
});

const reviewModel = mongoose.model('prodreviews', reviewSchema);


const cartitemsSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userregister',
        required: true,
    }
})

const cartitemModel = mongoose.model('cartitems', cartitemsSchema);

const cartSchema = mongoose.Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cartitems",
            required: true,
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userregister',
        required: true,
    }
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = {
    prodModel,
    reviewModel,
    cartitemModel,
    cartModel,
}
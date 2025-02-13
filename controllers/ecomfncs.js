const multer = require('multer');
const { prodModel, reviewModel, cartitemModel, cartModel } = require('../models/prodmodel');
const { json } = require('express/lib/response');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


async function index(req, res) {
    const prods = await prodModel.find({});
    return res.render('index', {prods:prods, user:req.user});
}

async function addprod(req, res) {
    if (req.method=='POST'){
        data = req.body;
        await prodModel.create({name:data.name, description:data.description, price:data.price, stk_available:data.stk_available, prodImg:req.file.filename})
    };
    return res.render('addprod', {user:req.user});
}

async function viewprod(req, res) {
    const id = req.params.id;
    const prod = await prodModel.findOne({_id:id});
    const reviews = await reviewModel.find({product:id}).populate("owner", "username");
    if (req.method == 'POST'){
        data = req.body;
        if (data.hidden){
            const usercart = await cartModel.findOne({owner:req.user.id});
            const createcartitem = await cartitemModel.create({product: data.hidden, quantity: data.quantity, owner:req.user.id});
            if(usercart){
                usercart.items.push(createcartitem._id);
                await usercart.save();
            }else{
                const createnewcart = await cartModel.create({items:[], owner:req.user.id});
                createnewcart.items.push(createcartitem._id);
                await createnewcart.save();
            }
            
        }else{
            await reviewModel.create({review:data.review, owner: req.user.id, product:prod._id});
        }
    }
    return res.render('viewprod', {prod:prod, reviews:reviews, user:req.user});
};

async function cart(req, res) {
    const cartitems = await cartitemModel.find({owner:req.user.id}).populate('product');
    return res.render('cart', {user:req.user, cartitems:cartitems});
}

module.exports = {
    index,
    addprod,
    upload,
    viewprod,
    cart,
};
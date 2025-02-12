const multer = require('multer');
const { prodModel, reviewModel } = require('../models/prodmodel');
const { userModel } = require('../models/usermodel');

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
        console.log(data.name, data.description, data.price, data.stk_available, req.file.filename);
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
            console.log(data.hidden);
            
        }else{
            console.log(data.review);
            await reviewModel.create({review:data.review, owner: req.user.id, product:prod._id});
        }
    }
    return res.render('viewprod', {prod:prod, reviews:reviews, user:req.user});
}

module.exports = {
    index,
    addprod,
    upload,
    viewprod,
};
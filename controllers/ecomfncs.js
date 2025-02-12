const multer = require('multer');
const { prodModel } = require('../models/prodmodel');

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
    return res.render('index', {prods:prods});
}

async function addprod(req, res) {
    if (req.method=='POST'){
        data = req.body;
        console.log(data.name, data.description, data.price, data.stk_available, req.file.filename);
        await prodModel.create({name:data.name, description:data.description, price:data.price, stk_available:data.stk_available, prodImg:req.file.filename})
    };
    return res.render('addprod');
}

async function viewprod(req, res) {
    const id = req.params.id;
    const prod = await prodModel.findOne({_id:id});
    return res.render('viewprod', {prod:prod});
}

module.exports = {
    index,
    addprod,
    upload,
    viewprod,
};
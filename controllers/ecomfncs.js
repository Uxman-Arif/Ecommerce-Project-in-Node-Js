function index(req, res) {
    return res.render('index');
}

function addprod(req, res) {
    return res.render('addprod');
}

module.exports = {
    index,
    addprod,
};
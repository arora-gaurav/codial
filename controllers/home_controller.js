const User = require("../models/user");

module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('something', 'RAM');
    return res.render('home', {
        title: 'Codial Project'
    })
}


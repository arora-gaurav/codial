const User = require("../models/user");

module.exports.home = function(req, res){
    // res.cookie('something', 'RAM');
    return res.render('home', {
        title: 'Codial Project'
    })
}


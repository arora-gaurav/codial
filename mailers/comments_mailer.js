const nodemailer = require('../config/nodemailer');

// This is another way of exporting the method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'gauravcs25@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
        // html: '<h1>Yup, Your Comment is now published!'
    }, (err, info) => {
        if(err){
            console.log("Error in sending mail ", err);
            return;
        }
        // console.log('Message sent ', info);
        return;
    });
}
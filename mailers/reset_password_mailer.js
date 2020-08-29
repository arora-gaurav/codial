const nodemailer = require('../config/nodemailer');

// This is another way of exporting the method
exports.newResetPassword = (resetToken) => {
    let htmlString = nodemailer.renderTemplate({resetToken: resetToken}, '/resetTokens/new_reset_token.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'studios.grv@gmail.com',
        to: resetToken.user.email,
        subject: "Forget/Reset Password of Codial App",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in sending mail ", err);
            return;
        }
        // console.log('Message sent ', info);
        return;
    });
}
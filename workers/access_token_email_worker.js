const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset_password_mailer');

queue.process('resetPasswords', function(job, done){
    console.log('emails worker is processing a job');

    resetPasswordMailer.newResetPassword(job.data);

    done();
});
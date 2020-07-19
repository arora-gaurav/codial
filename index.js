const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        //Using String Interpolation using ` sign nd ${} to evaluate something
        console.log(`Error in the running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
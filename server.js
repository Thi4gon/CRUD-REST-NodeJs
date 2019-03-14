require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser');

const albumsController = require('./controllers/albumsController');


var app = express();
//condigurando bodyparser---------------------------------------------
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
//----------------------------------------------------------------------

//configurando o express handlebars---------------------------------------
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs',exphbs({ extname:'hbs',defaultLayout: 'mainLayout', layoutsDir:__dirname + '/views/layouts/'}));   
app.set('view engine', 'hbs');
// -----------------------------------------------------------------------


app.listen(8000, () => {
    console.log(`Server started on port 8000`);
});

app.use('/albums',albumsController);
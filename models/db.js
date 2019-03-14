const mongoose = require('mongoose');


//criando conexão com o banco
mongoose.connect('mongodb://localhost:27017/AlbumsDB',{useNewUrlParser:true}, (err)=>{

//testando se teve erro ou não de conexão e printando o erro no console
if(!err) { console.log('Conectou!!.')}
else {console.log('Erro na conexão com o Banco:'+err )}

});


require('./albums.model');
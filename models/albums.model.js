const mongoose = require('mongoose');

var albumsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: 'Campo Obrigatório!'
    },

    idusuario: {
        type: String
    }
});


mongoose.model('Albums', albumsSchema);
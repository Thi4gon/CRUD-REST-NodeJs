const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Albums = mongoose.model('Albums');
var axios = require('axios');

router.get('/', (req, res) => {
    res.render("album/addOrEdit", {
        viewTitle: "Coloque o titulo do Album:"
    });

});

router.post('/', (req, res) => {
    if (req.body._id == '')
        salvarAlbum(req, res);
    else
        atualizarAlbum(req, res);
});



function salvarAlbum(req, res) {
    var albums = new Albums();
    albums.title = req.body.title;
    albums.idusuario = req.body.idusuario;

    albums.save((err, doc) => {
        if (!err) res.redirect('/albums/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationErorr(err, req.body);
                res.render("album/addOrEdit", {
                    viewTitle: "Coloque o titulo do Album:",
                    albums: req.body
                });
            } else
                console.log('Error ao salvar:' + err);
        }
    });
}


function atualizarAlbum(req, res) {
    Albums.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {

        if (!err) {
            res.redirect('albums/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationErorr(err, req.body);
                res.render("album/addOrEdit", {
                    viewTitle: 'Atualizar Album',
                    albums: req.body
                });
            }
        }
    });

}


router.get('/list', (req, res) => {
    Albums.find((err, docs) => {
        if (!err) {
            res.render("album/list", {
                list: docs
            });

        } else {
            console.log('Erro ao puxar a lista de Albums: ' + err);
        }
    });
});


function handleValidationErorr(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/delete/:id', (req, res) => {
    Albums.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/albums/list');
        } else {
            console.log('Erro ao deletar : ' + err);
        }
    });
});


router.get('/import', (req, res) => {

    axios
        .get("http://jsonplaceholder.typicode.com/albums")
        .then(function (raw) {

            for (var dados of raw.data) {
                var albums = new Albums();
                albums.title = dados.title;
                albums.idusuario = dados.userId;

                albums.save((err, doc) => {
                    if (!err) console.log("add sucess"); 
                    else {
                        if (err.name == 'ValidationError') {
                        } 
                        else console.log('Error ao salvar:' + err);
                    }
                });
            }
            res.redirect('/albums/list');
        }).catch(function (error) {
            if (err) console.log("Erro ao consumir API: " + error);
        });
});

router.get('/:id', (req, res) => {
    Albums.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("album/addOrEdit", {
                viewTitle: "Atualizar Album",
                albums: doc
            });
        }
    });
});

module.exports = router;
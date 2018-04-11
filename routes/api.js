var express = require('express');
var router = express.Router();
var axios = require('axios');
var userDB = require('../userDB');
var secret = require('../secret/secret');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    const accessToken = req.body.accessToken;

    let app_id = secret.app_id;
    let app_secret = secret.app_secret;

    //fetch info about user
    axios.get('https://graph.facebook.com/v2.12/me?fields=email,name,picture&access_token=' + accessToken)
        .then(response => {
            const { name, id, picture } = response.data;
            const token = require('crypto').randomBytes(64).toString('hex');

            //push user data to db
            userDB.push({
                name: name,
                id: id,
                picture_url: picture.data.url,
                access_token: accessToken,
                token: token
            });

            res.send({name: name, id: id, picture_url: picture.data.url, token: token});
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.get('/get-posts', function(req, res, next) {
    const user = req.user;

    axios.get('https://graph.facebook.com/v2.12/me/posts?fields=likes,comments,message,created_time,caption,story,full_picture&access_token=' + user.access_token)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.get('/get-current-user', function(req, res, next) {
    const user = req.user;

    const current_user = {
        name: user.name,
        id: user.id,
        picture_url: user.picture_url
    };

    res.send(current_user);
});

router.post('/add-status', function(req, res, next) {
    //get current user
    const user = req.user;
    //get status
    const message = req.body.status;

    axios.post('https://graph.facebook.com/v2.12/me/feed?message='+ message +'&access_token=' + user.access_token)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            res.status(400).send(err);
        });

});


module.exports = router;

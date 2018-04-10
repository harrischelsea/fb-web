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

    axios.get('https://graph.facebook.com/v2.12/me?fields=email,name,picture&access_token=' + accessToken)
        .then(response => {
            const { name, id, picture } = response.data;
            const token = require('crypto').randomBytes(64).toString('hex');
            userDB.push({
                name: name,
                id: id,
                picture_url: picture.data.url,
                access_token: accessToken,
                token: token
            });
            console.log(userDB);
            res.send({name: name, id: id, picture_url: picture.data.url, token: token});
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

module.exports = router;

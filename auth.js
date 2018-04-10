var userDB = require('./userDB');

var authMiddleware = function (req,res,next) {
    const token = req.get('Authorization');
    if (!token) return next();

    // find user
    const user = userDB.find(el => el.token == token);
    if (!userDB) return next();

    // populate req obj with user details
    req.user = user;
    return next();
};

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; // Ensure you have access to `jwt` from cookies

    if (token) {
        jwt.verify(token, 'lindsey', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                console.log('haha');
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        console.log('haha');
        jwt.verify(token, 'lindsey', (err, decodedToken) =>{
            res.redirect('/');
        });
    } else{
        next();
    }
}

module.exports = { requireAuth, isLoggedIn };
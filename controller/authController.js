const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Error handling function
const handleErrors = (err) => {
    let errors = { username: '', password: '' };

    // Incorrect username
    if (err.message === 'incorrect username') {
        errors.username = 'That username is not registered';
    }

    // Incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // Duplicate entry
    if (err.original && err.original.sqlMessage) {
        if (err.original.sqlMessage.includes('Duplicate entry')) {
            errors.username = 'Username already exists';
            return errors;
        }
    }

    // Validation errors
    if (err.name === 'SequelizeValidationError') {
        err.errors.forEach((error) => {
            errors[error.path] = error.message;
        });
    }

    return errors;
}

// Token configuration
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (username) => {
    return jwt.sign({ username }, 'lindsey', {
        expiresIn: maxAge
    });
}

// Route handlers
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    try {
        const user = await User.create({ username, password });
        const token = createToken(username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.username }); // 201 Created status
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors }); // 400 Bad Request status
    }
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    try {
        const user = await User.login(username, password);
        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.username });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({ errors }); 
    }
}

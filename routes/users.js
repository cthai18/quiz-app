const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');

const saveUser = async (res, newUser) => {
    try {
        const user = await newUser.save();
        jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                return res.json({
                    token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    }
                });
            }
        );
    } catch(err) {
        return res.status(400).json('Error: ' + err);
    }
}

const registerUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        
        //create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                saveUser(res, newUser);
            })
        })
        
    } catch(err) {
        return res.status(400).json('Error: ' + err);
    }
}

//@route    POST /users
//@desc     Register new user
//@access   Public
router.route('/').post((req, res) => {
    const { email, password, firstName, lastName } = req.body;

    //validation
    if(!email || !password || !firstName || !lastName) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    registerUser(req, res);
});



module.exports = router;
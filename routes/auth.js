const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');


const validateUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });
        
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({ msg: 'Invalid Credentials' });

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

//@route    POST /users
//@desc     Register new user
//@access   Public
router.route('/').post((req, res) => {
    const { email, password } = req.body;

    //validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    validateUser(req, res);
});



module.exports = router;
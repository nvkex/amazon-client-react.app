const router = require('express').Router();
const User = require('../models/User');

router.get('/create-admin', async (req, res) => {
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(user);
    }
    catch(err){
        res.send({msg: err.message})
    }
})

export default router;
'use strict'

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {

    const credentials = auth(req);

    if(credentials){
        const user = await User.findOne({where: {emailAddress: credentials.name}});
        if(user){
            const authenticated = bcrypt.compareSync(credentials.pass);
            if(authenticated){
                console.log(`User successfully authenticated ${user.email}`);
                req.currentUser = user;
            }
        } else {
            res.status(401).json({ errorMessage: 'Access Denied'});
        }
    }
}
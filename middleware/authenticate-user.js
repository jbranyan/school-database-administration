'use strict'

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
    let message;

    try {
        const credentials = auth(req);

        if(credentials){
            const user = await User.findOne({
                where: { emailAddress: credentials.name }
            });
            if(user){
                const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
                if(authenticated){
                    console.log(`User successfully authenticated ${user.firstName} ${user.lastName}`);
                    req.currentUser = user;
                } else {
                    message = 'Authentication failure';
                }
            } else {
                message = "user not found";
            }
        } else {
            message = "Unable to authenticate user";
        }

        if(message){
            res.status(401).json({ errorMessage: 'Access Denied'});
        } else {
            next();
        }
    } catch (error) {
        res.json({error: error.message});
    }

};
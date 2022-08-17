'use strict'

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {

    let errorMessage;
    const credentials = auth(req);

    if(){
        
    }
}
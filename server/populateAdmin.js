#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

import Admin from './models/admin.js';
import Post from './models/post.js';
import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const createAdmin = async (first_name, last_name, username, unhashed, admin) => {
    const password = bcrypt.hashSync(unhashed, 8)
    const adminDetail = {first_name, last_name, username, password, admin};

    const newadmin = new Admin(adminDetail);

    try {
        await newadmin.save();
        console.log('Successful upload');
    } catch (error) {
        console.log(error.message);
    }
}

const createPost = async (title, text, date, published) => {
    const postDetail = {title, text, date, published};

    const newpost = new Post(postDetail);

    try {
        await newpost.save();
        console.log('Successful upload');
    } catch (error) {
        console.log(error.message);
    }
}

// createAdmin('Christopher', 'Pohl', 'CJPohl', 'ilikeass', true);

createPost('First Post', 'Hello, world asdkljgn asdjkg asdfjg asdfjg asdjkg asjkgn', Date.now(), true);

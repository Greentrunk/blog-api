import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';

const app = express();

import auth from './routes/auth.js';
import secureRouter from './routes/secureRouter.js';
import clientRouter from './routes/clientRouter.js';

// Connect MongoDB
import mongoose from 'mongoose';
const mongoDB = process.env.MONGO_PASS;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

import './passport.js';
app.use(passport.initialize());

app.use('/auth', auth);
app.use('/secure/posts', passport.authenticate('jwt', {session: false}), secureRouter);
app.use('/posts', clientRouter);

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
import passport from 'passport';
import 'passport-local';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

import passportJwt from 'passport-jwt';
const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;

import Admin from './models/admin.js';

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
async (username, password, done) => {
    try {
        // query admin user
        const user = await Admin.findOne({username});
        if (!user) {
            return done(null, false, {message: 'Incorrect Username'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user, {message: 'Logged In Successfully'});

    } catch (err) {
        return done(err);
    }
}));

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'food',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(error);
            }
        }
    )
);
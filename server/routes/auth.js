import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import passport from 'passport';

// Admin login POST
router.post('/login', async (req, res, next) => {

    passport.authenticate('local', {session: false}, async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An error occured');
                return next(error);
            }

            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);
                
                const body = {_id: user._id, username: user.username};
                const token = jwt.sign({user: body}, 'food');

                return res.json({token});
            }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
});

export default router;
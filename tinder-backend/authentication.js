const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const User = require('./models/UserSchema');
const isValidPassword = require('./lib/passwordsUtils').isValidPassword;

const customFields ={
    usernameField:'email',
    passwordField:'password'
};

const verifyCallback = (username,password,done) => {
    User.findOne({email:username})
    .then((user) =>{
        if(!user) return done(null,false);  
        const isValid = isValidPassword(password,user.password.hash,user.password.salt);
        if(isValid) done(null,user);
        done(null,false);
    })
    .catch(err => done(err))
};

const stratergy = new LocalStratergy(customFields,verifyCallback);
exports.local = passport.use(stratergy);

passport.serializeUser((user,done) =>{
    done(null,user.id);
});
passport.deserializeUser((userId,done) =>{
    User.findById(userId)
    .then((user) =>{
        done(null,user);
    })
    .catch(err => done(err))
});

exports.isUser = (req,res,next) =>{
     if(req.session.user === null){
        err = new Error('YOU ARE NOT LOGGED IN');
        next(err);
    }
    console.log(req.session.user);
    next();
}
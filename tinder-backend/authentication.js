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
passport.use(stratergy);

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
    if(req.session.user === 'authorized'){
        next();
    }
    else{
        res.statusCode = 401;
        res.send(`You are Not Authenticated  ${req.session.user}`);
        req.session.destroy();
    }
}
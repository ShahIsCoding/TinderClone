const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('./models/UserSchema');
const isValidPassword = require('./lib/passwordsUtils').isValidPassword;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const customFields ={
    usernameField:'email',
    passwordField:'password'
};

const verifyCallback = (username,password,done) => {
    User.findOne({email:username})
    .then((user) =>{
        // console.log('USER',user);
        if(!user) return done(null,false);  
        const isValid = isValidPassword(password,user.password.hash,user.password.salt);
        // console.log('isValid',isValid);
        if(isValid) done(null,user);
        done(null,false);
    })
    .catch(err => done(err))
};

const stratergy = new LocalStratergy(customFields,verifyCallback);
passport.use(stratergy);


// passport.use( 
//     new GoogleTokenStrategy({
//         clientID:process.env.clientId,
//         clientSecret:process.env.clientSECRET
//         },
//         function(accessToken, refreshToken, profile, done){
//             console.log('accessToken',accessToken);
//             console.log('refreshToken',refreshToken);
//             console.log('profile',profile);
//             console.log('done',done);
//         }
//     )
// );

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


function getJwt__token(playload){
    var token =  jwt.sign({_id:playload},process.env.SECRETKEY,{
        expiresIn: 60 * 60 *24 
    });
    return token;
}

module.exports.getJwt__token = getJwt__token;

exports.isUser = (req,res,next) =>{
    var token = req.cookies.token;
    if(token){
        jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
            if(err){
                res.statusCode = 400;
                res.clearCookie('token', {httpOnly:true});
                res.setHeader('Content-Type','application/json');
                res.json({err:'User Not Logged In'});
            }
            if(decoded){
                req.userId = decoded._id
            }
        });
    }
    else {
            res.statusCode = 400;
            res.clearCookie('token', {httpOnly:true});
            res.setHeader('Content-Type','application/json');
            res.json({err:'User Not Logged In'});
        }

    next();
}

const usersSchema = require('../models/userModel');
const passport = require('passport');



// Register User and authenticate
const registerUser = (req, res) => {

    const body = req.body;
    if(!body){
        return res
                .status(400)
                .json({
                    success: false,
                    error: 'Please enter a user'
                });
    }

    const newUser = new usersSchema(body)

    if(!newUser){
        return res
                .status(400)
                .json({
                    success: false,
                    error: err
                });
    }

    usersSchema.register({username: req.body.username}, req.body.password, function(err, user){
                if(err){
                    return res
                            .status(400)
                            .json({
                                error: err,
                                message: 'User not added'
                            });
                }else{
                    passport.authenticate("local")(req, res, function(){
                        console.log(newUser.firstName)
                        return res
                                .status(201)
                                .json({
                                    success: true,
                                    id: newUser._id,
                                    message: 'Sucessfully added a new user'
                                });
                    });
                }
            })
};


// Login and authenticate
const userLogin = (req, res) => {

    const user = new usersSchema({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, function(err){
        if(err){
            return res
                    .status(400)
                    .json({ 
                        error: err,
                        message: 'User not found',
                     });
        } else {
          passport.authenticate('local')(req, res, function(){
            return res
                    .status(200)
                    .json({
                        success: true,
                        data: user._id,
                    });
          });
        }
      });
};



module.exports = {
    registerUser,
    userLogin,
}

const bcrypt = require("bcryptjs");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async (req, res, next) => {
    const {fullname, email, password } = req.body;

    //check if field i empty 
    if(!fullname || !email || !password){
        //return next(appErr('All fields are required'));
        return res.render('users/register', {
            error: 'All fields are required',
        });
    }
    try{
        //1. check if user exist (email)
        const userFound = await User.findOne({ email });

        //throw an error
        if(userFound){
            return res.render('users/register', {
                error: 'Email is taken',
            });           
        }
        
        //Hash password
         const salt = await bcrypt.genSalt(10);
         const passwordHashed = await bcrypt.hash(password, salt);

        //register user
        const user = await User.create({
            fullname,
            email,
            password: passwordHashed,
        });

        //redirect
        res.redirect('/api/v1/users/profile-page');
    } catch (error) {
        res.json(error);
    }
};


//login
const loginCtrl = async (req, res, next) => {

    const {email, password}= req.body;
    if(!email || !password){
        return next(appErr('Email and password fields are required'));
    }

    try{
        //check is email exist
        const userFound = await User.findOne({ email });
        if(!userFound){
            //throw an error
            return res.render('users/login', {
                error: 'Invalid login credentials',
            }); 
        }

        //verify password
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if(!isPasswordValid){
            //throw an error
            return res.render('users/login', {
                error: 'Invalid login credentials',
            });           
        }

        //save the user into session
        req.session.userAuth = userFound._id;

        //redirect
        res.redirect('/api/v1/users/profile-page');

        res.json({
            status: "success",
            data: userFound,
        });
    } catch (error) {
        res.json(error);
    }
};


//details
const userDetailsCtrl = async (req, res) => {
    
    try{
        //get userId from params
        const userId = req.params.id;
        
        //find the user
        const user = await User.findById(userId);
        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.json(error);
    }
};


//profile
const profileCtrl = async (req, res) => {
    try{
        //get the login user
        const userId = req.session.userAuth;

        //find the user
        const user = await User.findById(userId).populate("post").populate("comments");

        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.json(error);
    }
};



const uploadProfilePhotoCtrl = async (req, res, next) => {
    console.log(req.file.path);
    try{

        //find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);

        //check if user if found
        if(!userFound){
            return next("User not found", 403);
        }

        //update profile photo
        await User.findByIdAndUpdate(userId, {
            profileImage: req.file.path,

        },
        {
            new: true,
        });
        res.json({
            status: "success",
            data: "You have successfully updated your profile image",
        });
    } catch (error) {
        return next(appErr(error.message));
    }
};

const uploadCoverImgCtrl = async (req, res) => {
    try{

        //find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);

        //check if user if found
        if(!userFound){
            return next("User not found", 403);
        }

        //update profile photo
        await User.findByIdAndUpdate(userId, {
            coverImage: req.file.path,

        },
        {
            new: true,
        });
        res.json({
            status: "success",
            data: "You have successfully updated your profile image",
        });
    } catch (error) {
        return next(appErr(error.message));
    }
};

const updatePasswordCtrl = async (req, res, next) => {
    const { password } = req.body;
    try{
        //check if user is updating the password
        if(password){
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            
            //update user
            await User.findByIdAndUpdate(req.params.id, {
                password: passwordHashed,
            }, 
            {  
                new: true,
            });

            res.json({
                status: "success",
                user: "Password has been changed successfully",
            });
            }


    } catch (error) {
        return next(appErr("Please provide password field"));
    }
};

const updateUserCtrl = async (req, res, next) => {
    const {fullname, email} = req.body;
    try{
        //check if email is not taken
        if(email){
            const emailTaken = await User.findOne({ email });
            if(emailTaken){
                return next(appErr("Email is taken", 400));
            }
        }

        //update the user
        const user = await User.findByIdAndUpdate(req.params.id, {
            fullname, email,
        },
        {
            new: true,
        });

        
        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        return next(appErr(error.message));
    }
};

const logoutCtrl = async (req, res) => {
    try{
        res.json({
            status: "success",
            user: "User logout",
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    registerCtrl, 
    loginCtrl,
    userDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverImgCtrl,
    updatePasswordCtrl,
    updateUserCtrl,
    logoutCtrl,
};


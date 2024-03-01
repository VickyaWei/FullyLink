const express = require('express');
const { 
    registerCtrl,
    loginCtrl, 
    userDetailsCtrl, 
    profileCtrl, 
    uploadProfilePhotoCtrl, 
    uploadCoverImgCtrl, 
    updatePasswordCtrl, 
    updateUserCtrl, 
    logoutCtrl  
} = require("../../controllers/users/users");
const multer = require("multer");
const protected = require("../../middlewares/protected");
const storage = require('../../config/cloudinary');
const userRoutes = express.Router();


//instant of multer
const upload = multer({storage});

//-----
//rendering forms
//-----

//login form
userRoutes.get("/login", (req, res) => {
    res.render("users/login.ejs", {
        error: ""        
    });
});

//register form
userRoutes.get("/register", (req, res) => {
    res.render("users/register.ejs", {
        error: ""
    });
});

//profile template
userRoutes.get("/profile-page", (req, res) => {
    res.render("users/profile.ejs");
});

//upload profile photo
userRoutes.get("/upload-profile-photo-form", (req, res) => {
    res.render("users/uploadProfilePhoto.ejs");
});

//upload cover photo
userRoutes.get("/upload-cover-photo-form", (req, res) => {
    res.render("users/uploadCoverPhoto.ejs");
});

//upload user form
userRoutes.get("/update-user-form", (req, res) => {
    res.render("users/updateUser.ejs");
});

//POST/register
userRoutes.post("/register", upload.single("profile"), registerCtrl);

//POST/login
userRoutes.post("/login", loginCtrl);

//GET/profile
userRoutes.get("/profile", protected, profileCtrl);

//PUT/profile-photo-upload/:id
userRoutes.put("/profile-photo-upload", protected, upload.single('profile'), uploadProfilePhotoCtrl);

//PUT/cover-photo-upload/:id
userRoutes.put("/cover-photo-upload", protected, upload.single('profile'), uploadCoverImgCtrl);

//PUT/update-password/:id
userRoutes.put("/update-password/:id", updatePasswordCtrl);

//PUT/update/:id
userRoutes.put("/update/:id", updateUserCtrl);

//GET/:id
userRoutes.get("/:id", userDetailsCtrl);

//GET/logout
userRoutes.get("/logout", logoutCtrl);


module.exports = userRoutes;


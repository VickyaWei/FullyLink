const express = require('express');
const { registerCtrl, loginCtrl, userDetailsCtrl, profileCtrl, uploadProfilePhotoCtrl, uploadCoverImgCtrl, updatePasswordCtrl, updateUserCtrl, logoutCtrl,  } = require("../../controllers/users/users");
const multer = require("multer");
const protected = require("../../middlewares/protected");
const storage = require('../../config/cloudinary');
const userRouters = express.Router();


//instant of multer
const upload = multer({storage});

//-----
//rendering forms
//-----

//login form
userRouters.get("/login", (req, res) => {
    res.render("users/login.ejs", {
        error: ""        
    });
});

//register form
userRouters.get("/register", (req, res) => {
    res.render("users/register.ejs", {
        error: ""
    });
});

//profile template
userRouters.get("/profile-page", (req, res) => {
    res.render("users/profile.ejs");
});

//upload profile photo
userRouters.get("/upload-profile-photo-form", (req, res) => {
    res.render("users/uploadProfilePhoto.ejs");
});

//upload cover photo
userRouters.get("/upload-cover-photo-form", (req, res) => {
    res.render("users/uploadCoverPhoto.ejs");
});

//upload user form
userRouters.get("/update-user-form", (req, res) => {
    res.render("users/updateUser.ejs");
});

//POST/register
userRouters.post("/register", upload.single("profile"), registerCtrl);

//POST/login
userRouters.post("/login", loginCtrl);

//GET/profile
userRouters.get("/profile", protected, profileCtrl);

//PUT/profile-photo-upload/:id
userRouters.put("/profile-photo-upload", protected, upload.single('profile'), uploadProfilePhotoCtrl);

//PUT/cover-photo-upload/:id
userRouters.put("/cover-photo-upload", protected, upload.single('profile'), uploadCoverImgCtrl);

//PUT/update-password/:id
userRouters.put("/update-password/:id", updatePasswordCtrl);

//PUT/update/:id
userRouters.put("/update/:id", updateUserCtrl);

//GET/:id
userRouters.get("/:id", userDetailsCtrl);

//GET/logout
userRouters.get("/logout", logoutCtrl);


module.exports = userRouters;


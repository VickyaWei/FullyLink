const express = require("express");
const { 
    createCommentCtrl, 
    commentDetailCtrl, 
    deleteCommentCtrl, 
    updateCommentCtrl 
} = require("../../controllers/comments/comments");


const commentRoutes = express.Router();

const protected = require("../../middlewares/protected");

//POST/comments 
commentRoutes.post("/:id", protected, createCommentCtrl);


//GET/comments/:id
commentRoutes.get("/:id", commentDetailCtrl);

//DELETE/comments/:id
commentRoutes.delete("/:id", deleteCommentCtrl);

//PUT/comments/:id
commentRoutes.put("/:id", updateCommentCtrl);

module.exports = commentRoutes;
const express = require('express');
const { createCommentCtrl, commentDetailCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../../controllers/comments/comments');


const commentRouters = express.Router();

const protected = require("../../middlewares/protected");

//POST/comments 
commentRouters.post("/:id", protected, createCommentCtrl);


//GET/comments/:id
commentRouters.get("/:id", commentDetailCtrl);

//DELETE/comments/:id
commentRouters.delete("/:id", deleteCommentCtrl);

//PUT/comments/:id
commentRouters.put("/:id", updateCommentCtrl);

module.exports = commentRouters;
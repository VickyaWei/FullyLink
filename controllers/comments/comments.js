const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const Comment = require("../../models/comment/Comment");
const appErr = require("../../utils/appErr");

const createCommentCtrl = async (req, res, next) => {
    const {message} = req.body;

    try{ 
        //find the post
        const post = await Post.findById(req.params.id);

        //create the comment
        const comment = await Comment.create({
            user: req.session.userAuth,
            message,
        });

        //push the comment to post
        post.comments.push(comment._id);

        //find the user
        const user = await User.findById(req.session.userAuth);

        //push the comment into user
        user.comments.push(comment._id);

        //disable validation
        //save
        await post.save({validateBeforeSave: false});
        await user.save({validateBeforeSave: false});

        res.json({
            status: "success",
            data: comment,
        });
    } catch (error) {
        return next(appErr(error.message));
    }
};


const commentDetailCtrl = async (req, res) => {
    try{
        res.json({
            status: "success",
            user: "Comments details",
        });
    } catch (error) {
        res.json(error);
    }
};

const deleteCommentCtrl = async (req, res) => {
    try{
        res.json({
            status: "success",
            user: "Comments deleted",
        });
    } catch (error) {
        res.json(error);
    }
};

const updateCommentCtrl = async (req, res) => {
    try{
        res.json({
            status: "success",
            user: "Comments updated",
        });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    createCommentCtrl,
    commentDetailCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
};

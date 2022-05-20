var mongoose = require('mongoose');

const ForumMessageSchema = new mongoose.Schema({ 
    forumThreadID: {unique: true, type: String},
    title: String,
    text: String,
    authorID: {type :String, required: true }
}
);

const ForumMessage = mongoose.model("ForumMessage", ForumMessageSchema);
module.exports = ForumMessage;
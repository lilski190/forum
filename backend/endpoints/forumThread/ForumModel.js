var mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({ 
    name: String,
    description: String,
    ownerID: {type :String, required: true }
}
);

const Forum = mongoose.model("Forum", ForumSchema);
module.exports = Forum;
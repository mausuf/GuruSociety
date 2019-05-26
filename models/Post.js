const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create variable called Schema

const PostSchema = new Schema ({
    user: { // Post need to be connected to a user so reference to user
        type: Schema.Types.ObjectId, 
        ref: "users" // reference users model
    },
    text: {
        type: String,
        required: true
    },
    name: { // If a user deletes their profile, we want their name and avatar to still remain on the posts made by that now deleted user & profile*
        type: String
    },
    avatar: { //*reference above
        type: String
    },
    likes: [ // Create an array of likes; app has ability to like posts
        {
            user: { // This is to know which likes from which user, and also to limit each user to like each post only once
                type: Schema.Types.ObjectId, 
                ref: "users"
            }
        }
    ],
    comments: [
        {
            user: { // This is to know which comments from which user
                type: Schema.Types.ObjectId, 
                ref: "users"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Post = mongoose.model("post", PostSchema);
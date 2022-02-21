const { Schema, model, Types } = require("mongoose");
var moment = require('moment');

const ReactionSchema = new Schema(
    {
        // this reactionId is to avoid confusion with parent thought Id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: moment().format('MMM Do YYYY, h:mm:ss a'),
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date, 
            default: moment().format('MMM Do YYYY, h:mm:ss a'),
        },
        userName: {
            type: String,
            required: "Please enter a username!"
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
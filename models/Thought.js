const { Schema, model, Types } = require("mongoose");

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
            deafult: Date.now,
            // finish the rest of this get off with dayjs
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
            deafult: Date.now,
            // fill this out later with dayjs
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
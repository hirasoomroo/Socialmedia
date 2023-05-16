import { ThoughtSchema, model } from 'mongoose';
// Schema to create a thought model
const ThoughtSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    thoughtText: {
        type: String,
        required: 'Write your thought here, max 280 words.',
        minlength: 1,
        maxlength: 280

    },
    //format the timestamp
    createdAt: {
        type: Date,
        default: Date.now,

    },

    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});



module.exports = ThoughtSchema;
import { reactionSchema, Types } from 'mongoose';

const reactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionName: {
            type: String,
            required: true,
            maxlength: 280,
        },
    },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

export default reactionSchema;

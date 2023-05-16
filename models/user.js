const { Schema, model} = require('mongoose');
const User = model('User', UserSchema);

const UserSchema = new Schema(
  {

    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Please enter the username'
    },
    email: {
      type: String,
      trim: true,
      required: 'Please enter the email',
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'

    }],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
})



module.exports = User;
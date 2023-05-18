const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
      $comment: "Reference Thoughts Model"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      $comment: "Reference to user ID"
    }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'friends',
  count: true
});

const User = model('User', userSchema);

module.exports = User;

const { Schema, model, Types } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validator: {
                validator: function(v) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
                }
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }]
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
});

const user = model('user', userSchema)

module.exports = user

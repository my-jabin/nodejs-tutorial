const mongoose = require("../db/mongoose")
const validator = require('validator')
const bcrypt = require("bcryptjs")

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: {
            validator: function (pwd) {
                return !pwd.includes('password')
            },
            message: props => `Password cannot contains key workd "password"`
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v)
            },
            message: props => `${props.value} is not a valid Email address!`
        }
    }
});


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error(`The email ${email} does not exist`)
    }
    let isMatch
    if (password) {
        isMatch = await bcrypt.compare(password, user.password)
    }

    if (!isMatch) {
        throw new Error(`Password is wrong. Unable to login`)
    }

    return user
}
// before save method called, transform password to hashed password
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10).then((salt) => {
            // console.log(salt);
            return bcrypt.hash(user.password, salt)
        }).then((hash) => {
            // console.log(hash);
            user.password = hash;
            next();
        }).catch((e) => {
            console.log(e);
        })
    } else {
        next();
    }
});


const User = mongoose.model('user', userSchema)

module.exports = User

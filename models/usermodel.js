const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    salt:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
    
}, {timestamps:true})


userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password'))return;
    const salt = randomBytes(16).toString();
    const hashed_password = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashed_password;
    next();
})

userSchema.static('matchPassword', async function(username, password) {
    const user = await this.findOne({ username });
    if (!user) throw new Error('User not found');
    const salt = user.salt;
    const storedPassword = user.password;
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
    if (hashedPassword.toString() !== storedPassword.toString()) {
        throw new Error('Incorrect Password');
    }
    
    return user;
});


const userModel = mongoose.model('userregister', userSchema);

module.exports = userModel;
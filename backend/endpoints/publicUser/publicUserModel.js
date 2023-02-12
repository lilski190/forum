var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PublicUserSchema = new mongoose.Schema({ 
    userID: {type: String, unique: true},
    userName: String,
    password: String,
    isAdministrator: {type: Boolean, default: false}
}
);

//password hashen
PublicUserSchema.pre("save", function (next) {
    let user = this
    console.log(`Pre-save ${ this.password } change: ${ this.isModified("password") }`);

    if (!user.isModified("password")) {
        return next()
    }
    //salt anwenden
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword
        next()
    })
}, function (error) {
    next(error)
})
PublicUserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if (error)
            return next(error)
        else
            next(null, isMatch)
    })
}

const PublicUser = mongoose.model("PublicUser", PublicUserSchema);
module.exports = PublicUser;
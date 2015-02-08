'use strict';

var self = this,
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// TODO: Setup migrations (schema versioning)
// http://derickrethans.nl/managing-schema-changes.html
self.roleSchema = new mongoose.Schema({
    roleId: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    permissions: { type: Number },
    schemaVersion: { type: Number, required: true }
});

self.userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    roleId: { type: Number, required: true }
});

// Hash password
// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
self.userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

self.userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

self.accountSchema = new mongoose.Schema({
    accountId: { type: Number, required: true, index: { unique: true } },
    createDate: { type: Date, required: true },
    active: { type: Boolean, required: true },
    users: [self.userSchema],
    schemaVersion: { type: Number, required: true }
});

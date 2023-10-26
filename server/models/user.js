const mongoose = require('mongoose')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const secretWord = 's@me!secret'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  xauth: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateAuthToken = function () {
  const user = this
  const xauth = jwt.sign({_id: user._id.toHexString()}, secretWord).toString()

  user.xauth = xauth

  return user.save().then(() => {
    return xauth
  })
};

UserSchema.statics.findByToken = async function (xauth) {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(xauth, secretWord)
  } catch (e) {

    return Promise.reject()
  }

  console.log('d', decoded)

  return User.findOne({
    _id: decoded._id,
    xauth
  })
}

UserSchema.statics.findByCredentials = function (email, password) {

  // console.log(email, password)

  const User = this
  return User.findOne({email})
  .then((user) => {

    if (!user) {
      return Promise.reject()
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user)
        }

        else {
          reject()
        }
      })
    })
  })
}

UserSchema.pre('save', function (next) {

  const user = this

  if (user.isNew) {
    user.createdAt = new Date().toISOString()
    user.updatedAt = user.createdAt
  }

  else {
    user.updatedAt = new Date().toISOString()
  }

  if (user.isModified('password')) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
  } else {
    next()
  }
})

UserSchema.statics.findByEmail = function (email, password) {

  console.log(email, password)

  const User = this
  return User.findOne({email})
  .then((user) => {

    console.log('found user', user)

    if (!user) {
      return Promise.reject()
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user)
        }

        else {
          reject()
        }
      })
    })
  })
}


UserSchema.methods.toJSON = function () {
  const o = this;

  const oObject = o.toObject();

  return _.pick(oObject, ['_id', 'firstName', 'lastName', 'age', 'createdAt', 'email', 'isVerified']);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
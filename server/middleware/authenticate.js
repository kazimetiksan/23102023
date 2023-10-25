const { User } = require('../models/user')

const authenticate = (req, res, next) => {

  console.log('authenticating user')
  const xauth = req.header('xauth')
  console.log({ xauth })

  User.findByToken(xauth)
    .then((user) => {

      if (!user) {
        return Promise.reject()
      }

      req.user = user
      next()

    }).catch((e) => {

      console.log('e', e)
      res.status(401).send(e)
    })
}

module.exports = { authenticate }
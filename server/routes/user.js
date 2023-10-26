const {authenticate} = require('../middleware/authenticate')

const express = require('express');
const router = express.Router();

const { User } = require('../models/user')

const _ = require('lodash');

router.get('/checkVerification', async (req, res) => {

    const xauth = req.header('xauth')
    const found = await User.findOne({xauth})

    let status = 404
    if (found) {

        status = found.isVerified ? 200 : 403
    }

    res.sendStatus(status)
  })

router.get('/verify', async (req, res) => {

    const xauth = req.header('xauth')
    const found = await User.findOne({xauth})

    if (found) {
        found.isVerified = true
        await found.save()

        res.sendStatus(202)
    } else {

        res.sendStatus(404)
    }

})

router.get('/signout', authenticate, async (req, res) => {

    req.user.xauth = ""
    await req.user.save()

    res.sendStatus(200)
})

router.get('/me', authenticate, async (req, res) => {

    res.send(req.user)
})

router.post('/signin', async (req, res) => {

    const body = _.pick(req.body, ['email', 'password'])

    console.log('sign body', body)

    User.findByEmail(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((xauth) => {
            res.header('xauth', xauth).send(user)
        })
    }).catch((e) => {
        res.status(404).send(e)
    })
})


router.post('/signup', async (req, res) => {

    const body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName', 'age'])

    const obj = new User({
        ...body,
    })

    obj.save()
        .then(() => {
            return obj.generateAuthToken()
        })
        .then(async (xauth) => {

            res.header('xauth', xauth).send(obj)
        })
        .catch((e) => {
            console.log('error', e)
            if (e.code === 11000) {
                res.status(409).send({
                    errorMessage: 'Username already exists'
                })
            } else {
                res.status(401).send(e)
            }
        })
})

router.delete('/user/:_id', async (req, res) => {

    await User.findOneAndRemove({
        _id: req.params._id
    })
    res.sendStatus(200)
});

router.patch('/user/:_id', async (req, res) => {

    const body = _.pick(req.body, ['firstName', 'lastName', 'age'])

    const obj = await User.findOneAndUpdate({
        _id: req.params._id
    }, {
        ...body
    }, {
        new: true
    })

    res.send(obj)
});

router.post('/user', async (req, res) => {

    const body = _.pick(req.body, ['firstName', 'lastName', 'age'])

    const obj = new User(body)
    await obj.save()

    res.send(obj)
});

router.get('/users', async (req, res) => {

    const users = await User.find({})
    console.log('db users', users)
    res.send(users)
});

module.exports = router;
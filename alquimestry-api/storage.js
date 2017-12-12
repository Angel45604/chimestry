'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const asyncify = require('express-asyncify')
const debug = require('debug')('alquimestry:api:routes')
let auth = require('./auth')

const db = require('alquimestry-db')

const config = require('./config')

const storage = asyncify(express())

let User, services

storage.use(morgan('dev'))
storage.use(bodyParser.json())
storage.use(bodyParser.urlencoded({extended: true}))

storage.use(cookieParser())

storage.use(session({
  key: 'user_sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}))

storage.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    User = services.User
  }
  next()
})

storage.use(async (req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

const sessionChecker = (req, res, next) => {
  if (req.session.user & req.cookies.user_sid) {
    debug('USER ALREADY LOGGED IN')
  } else {
    next()
  }
}

storage.get('/', sessionChecker, async(req, res, next) => {
  res.redirect('storage/login')
})

storage.route('/signup')
    .get(sessionChecker, async(req, res, next) => {
      res.send('<html><head><title>SIGNUP</title></head><body>\n<form action=\"/login\" method=\"POST\">\n  <label>Login <input type=\"text\" name=\"login\"/></label>\n  <label>Password <input type=\"password\" name=\"password\"/></label>\n  <button type=\"submit\">Login</button>\n</form></body></html>')
    })
    .post(async(req, res, next) => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
        .then(user => {
          req.session.user = user.dataValues
          res.redirect('/dashboard')
        })
        .catch(error => {
          res.redirect('/signup')
        })
    })

    storage.route('/login')
    .get(sessionChecker, async(req, res, next) => {
        res.send('<html><head><title>Login</title></head><body>\n<form action=\"http://localhost:3000/storage/login\" method=\"POST\" enctype="application/x-www-form-urlencoded">\n  <label>Login <input type=\"text\" name=\"username\"/></label>\n  <label>Password <input type=\"password\" name=\"password\"/></label>\n  <button type=\"submit\">Login</button>\n</form></body></html>')
    })
    .post(async(req, res, next) => {
        debug('A request has come to /users')
        const username = req.body.username
        const password = req.body.password
        let users
        debug(`username: ${username} password: ${password}`)
        console.log(`username: ${username} password: ${password} :v`)
        try {
              debug(`HY`)
              await User.findByUserName(username).then((user) => {
              debug(`hiHI`)
                debug(user.password)
                debug(user._modelOptions.instanceMethods.validPassword(password, user.password))
                if(user._modelOptions.instanceMethods.validPassword(password, user.password)){
                    debug('LOGIN SUCCESSFULL')
                    req.session.user = user.dataValues;
                    debug(user.toJSON())
                    let token
                    auth.sign(user.toJSON(), config.auth.secret, (err, token) => {
                        if(!err) {
                            debug(`token: ${token}`)
                            return res.send({user, token})
                        }
                        return err
                    })
                }else {
                    return res.send('CREDENTIALS INCORRECT')
                }
            }).catch(e => {
                debug(e)
                return res.send('Username Unknown')
            })
        }catch (e) {
            return next(e)
        }

    })

storage.get('/dashboard', async(req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.send('<html><head><title>DASHBOARD</title></head><body>\nDASHBOARD</body></html>')
  } else {
    res.send('YOU ARE NOT LOGGED IN')
  }
})

storage.get('/logout', async(req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid')
    debug('Logout successfull')
  } else {
    debug('you are not logged')
  }
})

storage.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

module.exports = storage

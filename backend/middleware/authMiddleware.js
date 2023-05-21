const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try{
                //Get token from header
                token = req.headers.authorization.split(' ')[1]

                //Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                //Get user from the token
                //req.user so that it can be accessed in any route that is protected
                req.user = await User.findById(decoded.id).select('-password')

                next()
            } catch(error) {
                console.log(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }

        if(!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
}
  

module.exports = { protect, admin };
const mongoose = require('./../lib/db-connect')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require('dotenv').config('./../.env')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name")
                }
            }
        },
        lastName: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name")
                }
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("please enter valid email")
                }
            }
        },
        password: {
            type: String,
            required: true
        } 
    }
)
userSchema.methods.toJSON = function (){
    let user = this
    user = user.toObject()
    delete user.password
    return user
}
userSchema.methods.getAuthToken = async function (){
    let user = this
    const token = jwt.sign({
         email: user.email,
        _id: user._id
    }, process.env.AUTHKEY)
    return token
}
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
    
})

userSchema.statics.findByCredentials = async function(email, password){
    try {
        const user = this
        let result = await user.findOne({email})
        if(!result){
            return false
        }

        const verified = bcrypt.compare(result.password, password)
        if(!verified){
            return false
        }

        return result
    } catch (error) {
        console.log("error finding by credentials \n", error)
    }
 
}
const User = mongoose.model('User', userSchema)
module.exports = User
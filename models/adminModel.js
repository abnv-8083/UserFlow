const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSchema = new schema({
    name:String,
    email:String,
    password:String,
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin
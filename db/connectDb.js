require('dotenv').config()
const mongoose = require('mongoose')
let isConnected = false

const connectDB = async() =>{
    if (isConnected) return
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongoose Is connected')

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
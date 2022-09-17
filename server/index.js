const express = require("express")
const mongoose = require("mongoose")
const congif = require("config")

const app = express()
const PORT = congif.get('PORT')

const start = async () => {
    try {
        await mongoose.connect(congif.get('MONGODB_URI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })


        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log('error:', error.message);
        process.exit(1)
    }
}
start()
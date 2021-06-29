const express = require('express')
const connectDB = require('./config/db')

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const productRouter = require('./routes/productRoutes')

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use("/api/products", productRouter);



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
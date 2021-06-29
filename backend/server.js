const express = require('express')
const connectDB = require('./config/db')

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const products = require('./data/products')

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get("/api/products", (req, res) => {
  res.json(products)
});

app.get("/api/products/:id", (req, res) => {
  
  const product = products.find(prod => prod._id === req.params.id)
  
  res.json(product)
});



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
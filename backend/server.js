const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const productRouter = require('./routes/productRoutes')
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const { NotFound, ErrorHandler } = require('./middleware/error.middleware');


connectDB()

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5000",
    credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})


app.use("/api", [productRouter, userRouter, orderRouter]);


app.use(NotFound);

app.use(ErrorHandler);



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
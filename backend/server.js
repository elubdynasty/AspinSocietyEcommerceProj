const express = require('express')
const morgan = require("morgan");
const connectDB = require('./config/db')
const path = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const productRouter = require('./routes/productRoutes')
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const { NotFound, ErrorHandler } = require('./middleware/error.middleware');


connectDB()

const app = express()


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json())



app.use("/api", [productRouter, userRouter, orderRouter]);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )

} else {

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

}


app.use(NotFound);

app.use(ErrorHandler);



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
const express = require('express')
const morgan = require("morgan");
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 5000;

const productRouter = require('./routes/productRoutes')
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const { NotFound, ErrorHandler } = require('./middleware/error.middleware');


connectDB()

const app = express()


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json())

app.use(cors({origin: '*'}))

app.use("/api", [productRouter, userRouter, orderRouter, uploadRouter]);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )

} else {

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

}

/*the uploads folder isn't gonna be accessible by default
 Make it as a static folder so, it can get loaded on the browser */

//const __dirname = path.resolve() for ES6 only

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(NotFound);

app.use(ErrorHandler);



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
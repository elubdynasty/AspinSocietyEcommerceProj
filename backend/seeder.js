const mongoose = require('mongoose')
require('dotenv').config()

const users = require('./data/users')
const products = require("./data/products");
let User = require("./models/user.model");
let Product = require("./models/product.model");
let Order = require("./models/order.model");
const connectDB = require('./config/db')

connectDB()

const importData = async () => {
      try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log("Data imported!");

        process.exit()

      } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
      }
}

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed!");

    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}
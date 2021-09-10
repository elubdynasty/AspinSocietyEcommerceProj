const asyncHandler = require("express-async-handler");
let Product = require("../models/product.model");

const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1  //?pageNumber=[no.]

    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {}

    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page-1));
    

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
})


const getProductbyId = asyncHandler(async (req, res) => {
  
   const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Sorry, product can't be found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {

    await product.remove()

    res.json({
      message: `Product #${req.params.id} removed`,
    });

  } else {
    res.status(404);
    throw new Error("Sorry, product can't be found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "./images/sample.jpg",
    category: "Sample category",
    countinStock: 0,
    description: 'Sample desc'
  });

  const createdProduct = await product.save()

  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, category, description, image, countinStock } = req.body;

  const product = await Product.findById(req.params.id)

  if(product){

    product.name = name
    product.price = price
    product.category = category;
    product.description = description;
    product.image = image;
    product.countinStock = countinStock;

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);

  } else {
    res.status(404);
    throw new Error("Product not found");
    
  }
  
});


module.exports = {
    getProducts, getProductbyId, deleteProduct, createProduct, updateProduct
}
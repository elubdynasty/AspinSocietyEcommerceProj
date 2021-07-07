const asyncHandler = require("express-async-handler");
let Order = require("../models/order.model");

const addOrderItems = asyncHandler(async (req, res) => {
  
    const { orderItems, shippingAdd, paymentType, itemsPrice, taxPrice,
    shippingFee, totalPrice } = req.body

    if(orderitems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        
        
    } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAdd,
          paymentType,
          itemsPrice,
          taxPrice,
          shippingFee,
          totalPrice
        });

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

});



module.exports = addOrderItems;

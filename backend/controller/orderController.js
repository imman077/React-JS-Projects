const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// create order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  try {
    const cartItems = req.body;
    const amount = cartItems
      .reduce((acc, item) => acc + item.product.price * item.qty, 0)
      .toFixed(2);
    const status = "pending";

    const order = await orderModel.create({ cartItems, amount, status });

    //updating order stock
    cartItems.forEach(async(item) => {
      const product = await productModel.findById(item.product._id);
      product.stock = product.stock - item.qty;
      await product.save()
    })


    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

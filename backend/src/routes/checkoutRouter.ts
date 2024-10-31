import express, { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';

const checkoutRouter = express.Router();

checkoutRouter.post('/checkout', async (req: Request, res: Response) => {
  const { products, customer } = req.body;

  if (!products || !customer) {
    res
      .status(400)
      .json({ message: 'Products and customer information are required' });
  }

  try {
    let totalCost = 0;
    const validatedProducts = [];

    for (const item of products) {
      const { product: productId, quantity } = item;

      const product = await Product.findById(productId);

      if (quantity <= 0) {
        res
          .status(400)
          .json({ message: `Invalid quantity for product ${productId}` });
      }
      if (!product) {
        res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      } else {
        totalCost += product.price * quantity;
      }

      validatedProducts.push({ product: productId, quantity });
    }

    const newOrder = new Order({
      products: validatedProducts,
      totalCost,
      customer,
    });

    await newOrder.save();

    res
      .status(200)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (err: any) {
    console.error('Error placing order:', err);
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
});

export default checkoutRouter;

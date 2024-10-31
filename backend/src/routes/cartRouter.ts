import express, { Request, Response } from 'express';
import Product from '../models/Product';

const cartRouter = express.Router();

cartRouter.post('/cart', async (req: Request, res: Response) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    res
      .status(400)
      .json({ message: 'Cart must be an array with at least one product' });
  }

  const validProducts: any[] = [];
  const errors: any[] = [];

  for (const item of cart) {
    const { product: productId, quantity } = item;

    if (!productId || quantity === undefined) {
      errors.push({
        productId,
        message: 'Product ID and quantity are required',
      });
      continue;
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      errors.push({ productId, message: 'Quantity must be a positive number' });
      continue;
    }

    try {
      const product = await Product.findById(productId);

      if (!product) {
        errors.push({ productId, message: 'Product not found' });
        continue;
      }

      validProducts.push({ product, quantity });
    } catch (err: any) {
      errors.push({ productId, message: 'Server error', error: err.message });
    }
  }

  if (validProducts.length === 0) {
    res.status(400).json({ message: 'No valid products in cart', errors });
  }

  res.status(200).json({
    message: 'Cart processed successfully',
    products: validProducts,
    errors: errors.length > 0 ? errors : null,
  });
});

export default cartRouter;

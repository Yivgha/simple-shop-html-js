import express from 'express';
import Product from '../models/Product';

const productsRouter = express.Router();

productsRouter.get('/products', async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find(
      name ? { name: { $regex: name, $options: 'i' } } : {}
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

productsRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default productsRouter;

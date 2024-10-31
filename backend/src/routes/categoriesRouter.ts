import express from 'express';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate('products');

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default categoriesRouter;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cartRouter from './routes/cartRouter';
import categoriesRouter from './routes/categoriesRouter';
import checkoutRouter from './routes/checkoutRouter';
import productsRouter from './routes/productsRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const mongoURI = process.env.MONGODB_CONNECTION_STRING;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

app.use(cartRouter);
app.use(categoriesRouter);
app.use(checkoutRouter);
app.use(productsRouter);

app.get('/', (req, res) => {
  res.send('App is running');
});

if (!mongoURI) {
  throw new Error(
    'MongoDB connection string is missing from environment variables'
  );
}

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

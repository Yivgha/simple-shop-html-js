import { Schema, model, Document, Types } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  category: Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
} as Record<keyof IProduct, any>);

const Product = model<IProduct>('Product', productSchema);
export default Product;

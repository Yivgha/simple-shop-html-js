import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  products: Schema.Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Category = model<ICategory>('Category', categorySchema);
export default Category;

import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  products: { product: Schema.Types.ObjectId; quantity: number }[];
  totalCost: number;
  customer: { name: string; address: string; email?: string; phone?: string };
}

const orderSchema = new Schema<IOrder>({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
  },
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;

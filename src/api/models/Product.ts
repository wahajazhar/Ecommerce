import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Hats' | 'Jackets' | 'Clothes' | 'Shoes' | 'Costumes';
  featured: boolean;
}

const ProductSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Hats', 'Jackets', 'Clothes', 'Shoes', 'Costumes'] },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;

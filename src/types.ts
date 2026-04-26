export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Hats' | 'Jackets' | 'Clothes' | 'Shoes' | 'Costumes';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}

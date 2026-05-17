export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  items: { id: string; quantity: number; name: string; price: number }[];
  totalAmount: number;
  customerName: string;
  phone: string;
  address: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  status: 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Review {
  id: string;
  customerName: string;
  eventType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

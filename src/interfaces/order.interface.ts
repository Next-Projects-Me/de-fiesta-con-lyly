export interface Order {
    id: number;
    code: string;
    isPaid: boolean;
    createdAt: Date;
    total?: number;
    OrderAddress?: OrderAddress | null;
    OrderItem?: OrderItem[];
}

interface OrderAddress {
    firstName: string;
    lastName: string;
    phone?: string;
    document?: string;
    address?: string;
    city?: {
        name: string;
    };
}

interface OrderItem {
    product: {
        ProductImage: ProductImage[]
    }
}

interface ProductImage {
    url: string
}

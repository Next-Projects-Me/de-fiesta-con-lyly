export interface Product {
    id: number;
    subcategory?: string;
    images: string[];
    ProductImage: {
        id: number;
        url: string;
    }[];
    sizes?: string[];
    colors?: string[];
    numbers?: string[];
    genders?: string[];
    letters: boolean;
    tags?: string[];
    subcategoryId: number;
    title: string;
    description: string;
    inStock: number;
    price: number;
    slug: string;
}

export interface CartProduct {
    id: number;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    number?: string;
    letter?: string;
    gender?: string;
    image: string;
}

export interface SummaryInformation {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
    sendingCost: number;
}
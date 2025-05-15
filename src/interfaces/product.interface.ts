export interface Product {
    images: string[];
    sizes?: string[];
    colors?: string[];
    numbers?: string[];
    genders?: string[];
    categoryId: number;
    id: string;
    title: string;
    description: string;
    inStock: number;
    price: number;
    slug: string;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    number?: string;
    gender?: string;
    image: string;
}

export interface SummaryInformation {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
}
export interface Category {
    id: number;
    icon: number;
    name: string;
    Subcategory: Subcategory[]
}

export interface Subcategory {
    id: number;
    name: string;
    isActive?: boolean;
}

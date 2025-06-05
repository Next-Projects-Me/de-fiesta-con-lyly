interface Category {
    id: number;
    icon: number;
    name: string;
    Subcategory: Subcategory[]
}

interface Subcategory {
    id: number;
    name: string;
}

export interface Order {
    id: number;
    profile_id: number;
    payment_id: string;
    number: number;
    total: string;
    status: string;
    solds: Sold[];
}

export interface Sold {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    total: number;
    created_at: Date;
    product: Product;
}

export interface Product {
    photograph: string;
    name: string;
    description: string;
    price: number;
}
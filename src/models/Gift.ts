import { Category } from "./Category";

export interface Gift {
    id: number;
    photograph: string;
    category: Category;
    name: string;
    description: string;
    price: number;
    status: number;
}
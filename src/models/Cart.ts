export interface Cart {
    sku: number,
    name: string,
    photograph: string,
    description: string,
    quantity: number
    price: number,
    total: number,
    currency: string
}

export interface TotalValue {
    id: number,
    value: number
}
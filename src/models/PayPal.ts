export interface PurchaseItem {
    name: string;
    quantity: string;
    unit_amount: Amount;
    tax?: Amount;
    description?: string;
    sku: string;
    category: Category;
}

export interface Amount {
    currency_code?: string;
    value: string;
}

export enum Category {
    DIGITAL_GOODS = 'DIGITAL_GOODS',
    PHYSICAL_GOODS = 'PHYSICAL_GOODS'
}
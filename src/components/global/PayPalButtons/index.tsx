import React, { useEffect, useState } from 'react';
import { PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import { UnknownObject, CreateOrderActions } from '@paypal/paypal-js/types/components/buttons';
import { Cart } from '../../../models/Cart';
import { PurchaseItem } from '../../../models/PayPal';

interface PaymentButtonsProps{
    cart: Cart[];
    order: PurchaseItem[];
}

export const PaymentButtons: React.FC<PaymentButtonsProps> = ({ cart, order }) => {
    const [total] = useState(cart.reduce((total, item) => total + item.total, 0).toFixed(2))

    useEffect(() => {
        console.log(order)
    })

    function createOrder(data: UnknownObject, actions: CreateOrderActions){
        return actions.order.create({
            purchase_units: [
                { 
                    description: "Casamento Bruno e Pamella",
                    amount: {
                        currency_code: "BRL",
                        value: total
                    },
                    items: order,
                }
            ]
        })
    }

    return(
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)} 
        />
    );
}
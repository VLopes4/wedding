import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UnknownObject, CreateOrderActions, OnApproveActions, OnApproveData, OnCancelledActions } from '@paypal/paypal-js/types/components/buttons';
import { Cart } from '../../../models/Cart';
import { PurchaseItem } from '../../../models/PayPal';
import { useHistory } from 'react-router';
import api from '../../../services/api';
import { useLoad } from '../../../contexts/load';

interface PaymentButtonsProps{
    cart: Cart[];
    order: PurchaseItem[];
}

export const PaymentButtons: React.FC<PaymentButtonsProps> = ({ cart, order }) => {
    const [total] = useState(cart.reduce((total, item) => total + item.total, 0).toFixed(2));
    const { load, loaded } = useLoad();
    const history = useHistory();

    async function createOrder(data: UnknownObject, actions: CreateOrderActions){
        try {
            return await actions.order.create({
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
        } catch (error) {
            throw new Error('erro ao criar ordem de pagamento');
        }
    }

    async function onApprove(data: OnApproveData, actions: OnApproveActions){
        load()
        try {
            const approve = await actions.order.capture();    

            const response = await api.post('/order', { payment_id: approve.id, total, status: String(approve.status) });

            cart.map(async sold => {
                await api.post('/sold', { order_id: response.data.id, product_id: sold.sku, quantity: sold.quantity, total: sold.total });
            });

            loaded();
            const props = { id: response.data.id, success: true, error: '' }

            history.push('/status', props)
        } catch (error) {
            loaded();
            throw new Error('erro ao aprovar ordem de pagamento');
        }
    }

    function onCancel(data: UnknownObject, actions: OnCancelledActions){
        history.push('/cart');
    }

    function onError(err: UnknownObject){
        const props = { id: 0, success: false, error: err.message }
        history.push('/status', props)
    }

    return(
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(err) => onError(err)}
        />
    );
}
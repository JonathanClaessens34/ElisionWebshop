import { create } from "../../services/api";
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import React, { useEffect } from 'react';
import { Context } from "vm";
import { useRouter } from "next/router";

export default function Checkout({ paymentSession }: any) {
    const Router = useRouter();
    const configuration = {
        environment: 'test', // Change to 'live' for the live environment.
        clientKey: 'test_24NW6ZUCO5AKDMBJ4PC47X77UYAIEJEU', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        session: paymentSession,
        onPaymentCompleted: (result: any, component: any) => {
            if (result.resultCode == "Authorised") {
                const cart = JSON.parse(localStorage.getItem('cart') || "[]");
                let orderItems : any = [];
                cart.map((product : any) => {
                    orderItems.push({
                        amount: product.amount,
                        name: product.product.name,
                        price: product.product.price
                    });
                });
                const order = {
                    reference: paymentSession.reference,
                    orderItems: orderItems,
                    address: {
                        city: paymentSession.deliveryAddress.city,
                        street: paymentSession.deliveryAddress.street,
                        number: paymentSession.deliveryAddress.houseNumberOrName,
                        postalCode: paymentSession.deliveryAddress.postalCode
                    }
                }
                create(8080, `orderApi/addOrder`, order);
                Router.push("/cart/completion");
            }
        },
        onError: (error: { name: any; message: any; stack: any; }, component: any) => {
            console.log('onError in checkout', error.name, error.message, error.stack, component);
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
            card: {
              hasHolderName: true,
              holderNameRequired: true,
              billingAddressRequired: true
            }
          }
    };

    useEffect(() => {
        AdyenCheckout(configuration).then((checkout : any) => {
            checkout.create('dropin').mount('#dropin-container');
        })
    }, [])

    return (
        <div id="dropin-container" className="border border-gray-300 rounded-xl w-10/12 mt-48 mx-auto md:w-[50%] mb-24">
        </div>
    )
}

export async function getServerSideProps(context: Context) {
    const query = context.query;
    const paymentSession = await create(8080, `orderApi/sessions/`, query);
    return {
        props: {
            paymentSession
        },
    };
}
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { createShippment, createTransaction } from '@/app/lib/actions';
import { ShippingDetails, Transaction } from "../lib/definitions";

const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export async function POST(request:NextRequest) {

    const body = await request.json().then((data) => data as{data:{id:string}});
    const payment = await new Payment(client).get({id:body.data.id});

    console.log(payment);
    console.log(payment.additional_info?.items);
    console.log(payment.additional_info?.shipments?.receiver_address);
    if (payment.additional_info?.items !== undefined) {
        for (const item of payment.additional_info.items) {
            console.log(item);
        }
    }

    if (payment !== null && payment !== undefined 
        && payment.id !== undefined  && payment.description !== undefined
        && payment.transaction_amount !== undefined && payment.status !== undefined
        && payment.payer !== undefined && payment.payer.email !== undefined) {
        const paymentDescription = {
            id:payment.id,
            payer_email:payment.payer.email,
            amount:payment.transaction_amount,
            status:payment.status,
        }
        if (payment.status === 'approved') {
            const shippingDetails = {
                payment_id:payment.id,
                street_name: (payment.additional_info?.shipments?.receiver_address as any)?.street_name,
                street_number: (payment.additional_info?.shipments?.receiver_address as any)?.street_number ,
                floor:payment.additional_info?.shipments?.receiver_address?.floor || null,
                apartment:payment.additional_info?.shipments?.receiver_address?.apartment || null,
            }
            console.log(shippingDetails);
            await createShippment(shippingDetails);
        }
        console.log(paymentDescription);
        await createTransaction(paymentDescription);
    }

    
    return Response.json({sucess:true})
}
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { createTransaction } from '@/app/lib/actions';

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
        && payment.transaction_amount !== undefined && payment.status !== undefined) {
        const paymentDescription = {
            id:payment.id,
            product_name:payment.description,
            amount:payment.transaction_amount,
            status:payment.status,
        }
        console.log(paymentDescription);
        await createTransaction(paymentDescription);
    }

    
    return Response.json({sucess:true})
}
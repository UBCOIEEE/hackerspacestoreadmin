import { NextResponse  } from "next/server";
import prismadb from "@/lib/prismadb";
import Page from "@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page";
import { Resend } from 'resend';
import ConfirmationReceiptEmail from "@/components/success-template";
const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",  
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
} 

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
){
    const { orderid, action } = await req.json();

    const order = await prismadb.order.findUnique({
        where:{
            id: orderid
        },
        include:{ 
            orderItems: true/*{
                include: {
                    product: {
                        select:{
                            id: true,
                            name: true,
                            size: true,
                            mastertype: true,
                            mode: true,
                            childrentype: true,
                            thirdtype: true,
                            category: true
                        },
                    },
                    productvalue:{
                        select:{
                            id: true,
                            index: true,
                            price: true,
                            quantity: true,
                            typevaluemaster: true,
                            typevaluechildren: true,
                            typevaluethird: true,
                            images: true,
                            color: true
                        }
                    }
                }
            }*/
        }
    })  

    if(action==="success" && order?.personalemail){
        const date = new Date();
        await resend.emails.send({
            from: 'Hackerspace Store <hackerspacestore@ubcoieee.org>',
            to: order.personalemail,
            subject: 'Confirmation Email',
            react: ConfirmationReceiptEmail({ order: order, time: date }) as React.ReactElement,
        });
    }
    
    return NextResponse.json({ url: `${process.env.FRONTEND_STORE_URL}/feedback?success=1` }, {
        headers: corsHeaders
    })
}
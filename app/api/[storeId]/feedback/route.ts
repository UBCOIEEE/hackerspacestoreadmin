import { NextResponse  } from "next/server";
import prismadb from "@/lib/prismadb";
import Page from "@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page";
import { useState } from "react";
import toast from "react-hot-toast";
import { Email } from "@clerk/nextjs/server";
import { Resend } from 'resend';
import { EmailTemplateFeedback } from '@/components/email-template-feedback';
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
    const { formData } = await req.json();


    const feedback = await prismadb.feedback.create({
        data: {
            storeId: params.storeId,
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            studentId: formData.studentid,
            email: formData.email,
            ordernumber: formData.ordernumber,
            feedbackIn: formData.feedbackIn,
            reviewed: formData.reviewed,
        },
    })

    /*const email = {
        name: formData.firstname,
        email: formData.email,
        subject: 'Feedback Summary',
        message: formData.feedbackIn
    }*/
        const date = new Date();
        await resend.emails.send({
            from: 'Hackerspace Store <hackerspacestore@ubcoieee.org>',
            to: formData.email,
            subject: 'Feedback Summary',
            react: EmailTemplateFeedback({ firstName: formData.firstname, message: formData.feedbackIn, time: date }) as React.ReactElement,
        });

    /*const sendEmail = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/api/send', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        })
        if(response.status === 200){
            toast.success(`Hey ${email.name}, your message was sent successfully!`)
        }else{
            toast.error("Something went wrong!")
        }
    }*/
    
    NextResponse.json(feedback)
    

    return NextResponse.json({ url: `${process.env.FRONTEND_STORE_URL}/feedback?success=1` }, {
        headers: corsHeaders
    })
}
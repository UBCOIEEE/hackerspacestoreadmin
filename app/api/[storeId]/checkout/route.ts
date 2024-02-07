import { NextResponse  } from "next/server";
import prismadb from "@/lib/prismadb";
import Page from "@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",  
}
interface ItemType {
    id: string;
    productValueId: string;
    productIndex: number;
    productQuantity: number;
    productPrice: number;
    productName: string;
  }

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
} 

function generateRandomValue(): number {
    return Math.floor(Math.random() * (97 - 27 + 1)) + 27;
  }

export async function POST(
    req: Request,
    { params }: { params: { storeId: string, confirmationid: number } }
){
    const { formData, productIds: items } = await req.json();

    if (!items ||  items.length === 0){
        return new NextResponse("Product ids are required", { status: 400 })
    }

    if (!formData){
        return new NextResponse("Invalid Address", { status: 400 })
    }

    const productIds: ItemType[] = items.map((item: ItemType) => ({
        id: item.id,
        productValueId: item.productValueId,
        productIndex: item.productIndex,
        productQuantity: item.productQuantity,
        productPrice: item.productPrice,
        productName: item.productName
      }));
      const productIdss: string[] = items.map((item: ItemType) => item.productValueId);
    
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    
      items.forEach((item: ItemType) => {
        line_items.push({
          quantity: item.productQuantity,
          price_data: {
            currency: 'CAD',
            product_data: {
              name: item.productName,
            },
            unit_amount: item.productPrice * 100
          }
        });
      });

    const latestOrder = await prismadb.order.findFirst({
        where: {
          storeId: params.storeId, 
        },
        orderBy: {
          confirmationid: "desc",
        },
      }); 


    const randomValue = generateRandomValue();
    const confirmationId = latestOrder ? latestOrder.confirmationid + randomValue : 100000000;
    

    await Promise.all(
        productIds.map(async ({ productValueId, productQuantity }) => {
          await prismadb.productvalue.updateMany({
            where: { id: productValueId },
            data: { quantity: { decrement: productQuantity } },
          });
        })
      );

    const getProductById = async (productId: string) => {
      try {
          const product = await prismadb.product.findUnique({
              where: {
                  id: productId,
              },
              include:{
                size: true,
                category: true
              }
          });
          return product;
      } catch (error) {
          console.error('Error fetching product:', error);
          throw error;
      }
  };

  const getProductValueById = async (productvalueId: string) => {
    try {
        const productvalue = await prismadb.productvalue.findUnique({
            where: {
                id: productvalueId,
            },
            include:{
                images: true,
                color: true
            }
        });
        return productvalue;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
    
    const order = await prismadb.order.create({
        data: { 
            storeId: params.storeId, 
            isPaid: false,
            orderItems: {
                create: await Promise.all(productIds.map(async ({ id, productIndex, productQuantity, productValueId }) => {
                  const product = await getProductById(id);
                  if (!product) {
                    throw new Error(`Product with ID ${id} not found.`);
                  }
                  const productvalue = await getProductValueById(productValueId);
                  if (!productvalue) {
                    throw new Error(`ProductValue with ID ${productValueId} not found.`);
                  }
                  return {
                      name: product.name,
                      categoryname: product.category.name,
                      quantitychosen: productQuantity, 
                      mastertype: product.mastertype,
                      typevaluemaster: productvalue.typevaluemaster,
                      childrentype: product.childrentype,
                      typevaluechildren: productvalue.typevaluechildren,
                      thirdtype: product.thirdtype,
                      typevaluethird: productvalue.typevaluethird,
                      quantityavailableatproductvalue: productvalue.quantity,
                      imageurl: productvalue.images[0].url,
                      colorname: productvalue.color.name,
                      colorvalue: productvalue.color.value,
                      productIndex: productIndex,
                      description: product.description,
                      price: productvalue.price,
                      sizename: product.size.name,
                      sizevalue: product.size.value,
                      mode: product.mode,
                  };
              })),
            },
            totalPrice: productIds.reduce((total, item) => {return total + Number((Number(item.productPrice.toFixed(2))*Number(item.productQuantity.toFixed(2))).toFixed(2))}, 0),
            confirmationid: confirmationId,
            firstname: formData.firstname,
            lastname: formData.lastname,
            studentId: formData.studentid,
            personalemail: formData.personalemail,
            studentemail: formData.studentemail,
        },
    });
    
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: { 
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1&confirm=${order.id}`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1&cancel=${order.id}`,
      metadata: {
        orderId: order.id
      },
    });
    
    

    return NextResponse.json({ url: session.url }, {
      headers: corsHeaders
    });
}
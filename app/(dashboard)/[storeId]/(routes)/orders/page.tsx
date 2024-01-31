import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              values: true,
              size: true,
              category: true
            },  
          },
          productvalue: {
            include:{
              images: true
            }
          }
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item: { id: any; firstname: any; lastname: any; phone: any; confirmationid: any; studentId: any; personalemail: any; address: any; studentemail: any; totalPrice: number; isPaid: any; createdAt: any; orderItems: any[]; }) => ({
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    phone: item.phone,
    confirmationid: item.confirmationid,
    studentId: item.studentId,
    personalemail: item.personalemail,
    address: item.address,
    studentemail: item.studentemail, 
    totalPrice: formatter.format(item.totalPrice),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    product: item.orderItems.map((orderItem) => ({
      name: orderItem.product.name,
      mastertype: orderItem.product.mastertype,
      childrentype: orderItem.product.childrentype,
      thirdtype: orderItem.product.thirdtype,
      price: orderItem.productvalue.price,
      typevaluemaster: orderItem.productvalue.typevaluemaster,
      typevaluechildren: orderItem.productvalue.typevaluechildren,
      typevaluethird: orderItem.productvalue.typevaluethird,
      mode: orderItem.product.mode,
      size: orderItem.product.size.value,
      image: orderItem.productvalue.images[0].url,
      quantity: orderItem.quantity,
      index: orderItem.productvalue.index,
      category: orderItem.product.category.name
    })),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;

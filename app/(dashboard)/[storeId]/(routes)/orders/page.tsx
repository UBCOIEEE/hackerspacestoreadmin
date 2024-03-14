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
      orderItems: true/*{
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
              color: true,
              images: true
            }
          }
        },
      },*/
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    phone: item.phone,
    confirmationid: item.confirmationid,
    studentId: item.studentId,
    personalemail: item.personalemail,
    address: item.address,
    studentemail: item.studentemail, 
    /*addressline1: item.addressline1,
        addressline2: item.addressline2,
        postal: item.postal,
        city: item.city,
        country: item.country,*/
    totalPrice: formatter.format(item.totalPrice),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "ppp, MMMM do, yyyy"),
    product: item.orderItems.map((orderItem) => ({
      name: orderItem.name,
      mastertype: orderItem.mastertype,
      childrentype: orderItem.childrentype,
      thirdtype: orderItem.thirdtype,
      price: orderItem.price,
      typevaluemaster: orderItem.typevaluemaster,
      typevaluechildren: orderItem.typevaluechildren,
      typevaluethird: orderItem.typevaluethird,
      mode: orderItem.mode,
      size: orderItem.sizevalue,
      image: orderItem.imageurl,
      color: orderItem.colorname,
      quantity: orderItem.quantitychosen,
      index: orderItem.productIndex,
      category: orderItem.categoryname
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

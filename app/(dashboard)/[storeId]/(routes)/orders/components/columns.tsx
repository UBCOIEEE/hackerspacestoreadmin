"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import Priceperunit from "@/components/ui/price";
import TotalPrice from "@/components/ui/totalprice";


import { ColumnDef, CellContext } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  studentId: string;
  personalemail: string;
  studentemail: string;
  isPaid: boolean;
  address: string;
  totalPrice: string;
  createdAt: string;
  confirmationid: number;
  product: {
    mastertype: string;
    childrentype: string;
    thirdtype: string;  
    name: string;
    price: number;
    typevaluemaster: string; 
    typevaluechildren: string; 
    typevaluethird: string; 
    mode: string; 
    size: string; 
    image: string; 
    quantity: number;
    index: number; 
    category: string; 
  }[];
};


type OrderCellProps = {
  cell: CellContext<OrderColumn, keyof OrderColumn>;
};

const OrderCell: React.FC<OrderCellProps> = ({ cell }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderColumn['product']>([]);

  const handleOrderCellClick = () => {
    setSelectedOrder(cell.row.original.product);
    setShowOrderModal(true);
  };

  const closeModal = () => {
    setShowOrderModal(false);
  };

  return (
    <>
      <div className="feedback-cell" onClick={handleOrderCellClick}  style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {cell.row.original.product.length > 0
          ? `${cell.row.original.product[0].name}...` // Display the first mastertype as an example
          : "No products available"}
      </div>
      {showOrderModal && (
        <Modal
          title="Order Details"
          description="Products:"
          isOpen={showOrderModal}
          onClose={closeModal}
        >
          <div className="p-4 max-w-full max-h-80 overflow-y-auto overflow-x-auto whitespace-pre-wrap break-all">
          {selectedOrder.map((product, index) => (
              <div key={index} className="py-2 text-center object-center">
                <div
                className="w-48 h-48 mx-auto mb-4 flex-shrink-0 rounded-md overflow-hidden object-center"
              >
                <Image
                  src={product.image}
                  alt=""
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
                </div>
                Name: {product.name}
                <br />
                Category: {product.category}
                {product.mode === '1' && (
                  <>
                    <br />
                  </>
                )}

                {product.mode === '2' && (
                  <>
                    <br />
                    {product.mastertype}: {product.typevaluemaster}
                    <br />
                  </>
                )}

                {product.mode === '3' && (
                  <>
                    <br />
                    {product.mastertype}: {product.typevaluemaster}
                    <br />
                    {product.childrentype}: {product.typevaluechildren}
                    <br />
                  </>
                )}  

                {product.mode === '4' && (
                  <>
                    <br />
                    {product.mastertype}: {product.typevaluemaster}
                    <br />
                    {product.childrentype}: {product.typevaluechildren}
                    <br />
                    {product.thirdtype}: {product.typevaluethird}
                    <br />
                  </>
                )}

                Quantities: {product.quantity}
                <br />
                <Priceperunit value={product.price} />
                <TotalPrice value={product.price} quantity={product.quantity} />
                Size: {product.size}
                <br />
                
                <div className="flex items-center justify-center">
                </div>
                <br />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};





export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "confirmationid",
    header: "ID",
  },
  {
    accessorKey: "product",
    header: "Products",
    cell: OrderCell as any,

  },
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "studentId",
    header: "Student Id",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "personalemail",
    header: "Personal Email",
  },
  {
    accessorKey: "studentemail",
    header: "Student Email",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

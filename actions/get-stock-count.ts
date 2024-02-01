import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const productsWithValues = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
    include: {
      values: {
        select: {
          quantity: true,
        },
      },
    },
  });

  // Calculate the total quantity by summing up quantities from all values
  const stockCount = productsWithValues.reduce(
    (totalQuantity, product) =>
      totalQuantity +
      product.values.reduce((sum, value) => sum + (value.quantity || 0), 0),
    0
  );
 
  return stockCount;
};
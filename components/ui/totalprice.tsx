"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US",{
    style: "currency",
    currency: "CAD"
});

interface CurrencyProps{
    value: string | number;
    quantity: string | number;
}

const TotalPrice: React.FC<CurrencyProps> = ({
    value,
    quantity
}) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
        setIsMounted(true);
      }, []);    

    if (!isMounted){
        return null; 
    }

    return(
        <div
            className = "font-semibold"
        >
            Total: {formatter.format(Number(Number(value).toFixed(2))*Number(quantity.toFixed(2)))}
        </div>
    );
  }

export default TotalPrice;
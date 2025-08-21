'use client';

import { getStockById } from "@/actions/product/get-stock-by-id";
import { useCallback, useEffect, useState } from "react";

interface Props {
    id?: number;
}

export const StockLabel = ({ id }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getStock = useCallback(async () => {
        const inStock = await getStockById(id);
        setStock(inStock);
        setIsLoading(false);
    }, [id])

    useEffect(() => {
        getStock();
    }, [getStock])

    return (
        <>
            {
                isLoading
                    ? (
                        <h1 className={`antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
                            &nbsp;
                        </h1>
                    )
                    : (
                        <h1 className={`antialiased font-bold text-lg`}>
                            Stock: {stock}
                        </h1>
                    )
            }
        </>
    )
}

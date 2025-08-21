import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    inStock?: number;
    quantity: number;
    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ inStock, quantity, onQuantityChanged }: Props) => {

    const onValueChanged = async (value: number) => {
        if (inStock === quantity && value > 0) return;
        if (quantity + value < 1) return;
        onQuantityChanged(quantity + value);
    }

    return (
        <div className='flex sm:flex-col sm:items-center md:flex-row'>
            <button className="cursor-pointer" onClick={() => onValueChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 sm:my-3 md:my-0 px-5 bg-gray-200 text-center rounded flex justify-center items-center">
                {quantity}
            </span>
            <button className="cursor-pointer" onClick={() => onValueChanged(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}

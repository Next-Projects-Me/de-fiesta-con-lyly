import clsx from "clsx";

interface Props {
    selectedNumber: string | undefined;
    availableNumbers: string[] | undefined;
    onNumberChanged: (color: string) => void;
}

export const NumberSelector = ({ selectedNumber, availableNumbers, onNumberChanged }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Números disponibles</h3>
            <div className='flex flex-wrap'>
                {
                    availableNumbers?.map(number => (
                        <button
                            onClick={() => onNumberChanged(number)}
                            key={number}
                            className={
                                clsx(
                                    "mx-3 hover:underline text-lg cursor-pointer",
                                    {
                                        "underline": number === selectedNumber
                                    }
                                )
                            }>
                            {number}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

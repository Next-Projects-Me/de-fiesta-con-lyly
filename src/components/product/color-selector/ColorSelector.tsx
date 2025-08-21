import clsx from 'clsx';

interface Props {
    selectedColor: string | undefined;
    availableColors: string[] | undefined;
    onColorChanged: (color: string) => void;
}

export const ColorSelector = ({ selectedColor, availableColors, onColorChanged }: Props) => {

    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Colores disponibles</h3>
            <div className='flex'>
                {
                    availableColors?.map(color => (
                        <div key={color}
                            onClick={() => onColorChanged(color)}
                            className={
                                clsx(
                                    "flex justify-center items-center rounded-full",
                                    {
                                        "border-3": color === selectedColor
                                    }
                                )
                            } >
                            <button
                                key={color}
                                style={{ background: color }}
                                className="w-7 h-7 m-1 text-lg cursor-pointer rounded-full"
                            >
                            </button>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

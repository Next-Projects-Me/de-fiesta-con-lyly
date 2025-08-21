import React from 'react';

interface Props {
    setLetters: (value: string) => void;
}

export const LetterInput = ({ setLetters }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Letras</h3>
            <input
                className='w-max border-2  rounded-lg p-2 focus:border-primary focus:outline-none'
                onChange={(e) => setLetters(e.target.value)}
                placeholder='Escribe las letras'
            />
        </div>
    )
}

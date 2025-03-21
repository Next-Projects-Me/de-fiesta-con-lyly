import { Inter, Montserrat_Alternates, Fredoka } from "next/font/google";

export const inter = Inter({ subsets: ['latin'] });

export const titleFont = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['500', '700']
})

export const paragraph = Fredoka({
    subsets: ['latin'],
    weight: ['500', '700']
})
import { Title } from "@/components/ui/title/Title";

export default function WhoPage() {
    return (
        <div className="border-2 shadow-lg shadow-rose-500 border-rose-200 p-5 mx-5 sm:mx-0 mt-10 sm:mt-5 mb-15 rounded-2xl sm:text-2xl">
            <Title
                title="¿Quienes Somos?"
            />
            <p className="mb-5">
                De Fiesta con Lyly SAS es una micro empresa colombiana con más de 10 años haciendo que las celebraciones sean pura magia. Desde nuestro espacio en el barrio Niza,
                en Bogotá, nos dedicamos a crear piñatas increíbles y decoraciones que transforman cualquier fiesta en un momento inolvidable. Nos encanta lo que hacemos y se nota.
                Escuchamos tus ideas, tus gustos y todo lo que sueñas para ese día tan especial, y lo convertimos en una decoración única, llena de color, creatividad y ese toque
                especial que hace la diferencia.
            </p>
            <p className="mb-5">
                Nuestro equipo está formado por personas apasionadas, súper creativas y listas para acompañarte en cada paso con buena vibra, puntualidad y mucho cariño. En De Fiesta
                con Lyly SAS, no solo decoramos fiestas: creamos recuerdos que te sacan sonrisas cada vez que los revives.
            </p>
            <p className="font-bold">
                ¡Bienvenidos al lugar donde cada celebración se vuelve inolvidable!
            </p>

        </div>
    );
}
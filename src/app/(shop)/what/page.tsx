import { Title } from "@/components/ui/title/Title";

export default function WhatPage() {
    return (
        <div className="flex flex-col items-center sm:text-2xl">
            <div className="border-2 shadow-lg shadow-purple-500 border-purple-200 p-5 mx-5 sm:mx-0 mt-10 sm:mt-5 rounded-2xl">
                <Title
                    title="¿Qué hacemos?"
                />
                <p className="mt-10 mb-5">
                    Todo empezó en 2014 con una idea simple, pero poderosa: llevar a las fiestas colombianas productos únicos, creativos
                    y fuera de lo común. Así nació De Fiesta con Lyly SAS, una micro empresa que desde el día uno le apostó a la innovación
                    y al buen gusto en decoración.
                </p>
                <p className="mb-5">
                    ¿Sabes cómo comenzó todo? Con apenas unos cuantos productos publicados en Mercado Libre y muchas ganas de hacer algo diferente.
                    Al principio solo vendíamos al por mayor, trabajando con pequeñas empresas de eventos locales. Pero sabíamos que eso era
                    solo el comienzo.
                </p>
                <p className="mb-5">
                    Con el paso del tiempo nos lanzamos al mundo del comercio en línea y empezamos a crecer. Superamos retos, nos reinventamos
                    más de una vez y, poco a poco, fuimos ampliando nuestro catálogo. Hoy tenemos más de mil productos y estamos presentes en
                    grandes plataformas como Falabella y Rappi.
                </p>
                <p className="mb-5">
                    Pero no nos detenemos ahí. Nuestro próximo gran paso es tener nuestra propia tienda virtual, donde podamos compartir
                    directamente con nuestros clientes todo lo que hacemos, con el sello que nos caracteriza: profesionalismo, calidad y un toque único.
                </p>
                <p className="mb-5">
                    Porque si algo nos mueve es la pasión por lo que hacemos. Y porque cada fiesta merece ser inolvidable.
                </p>
                <p className="font-bold">
                    “Los sueños grandes empiezan con ideas pequeñas... y mucha pasión para hacerlas realidad.”
                </p>
            </div>
            <div className="flex flex-col md:flex-row sm:text-2xl mx-5 sm:mx-0 mt-8 mb-15">
                <div className="border-2 shadow-lg shadow-purple-500 border-purple-200 p-5 sm:mr-3 rounded-2xl">
                    <Title
                        title="Misión"
                    />
                    <p className="mb-5">
                        En De Fiesta con Lyly, vivimos para llenar tus celebraciones de alegría, color y mucha creatividad. Nos dedicamos a
                        ofrecer productos de excelente calidad como globos, piñatas, cortinas, manteles y más, con un sello especial: el toque vibrante
                        de la cultura mexicana. Cada decoración que creamos está pensada para sorprender y emocionar, con atención al detalle, cariño y un
                        servicio que busca siempre superar tus expectativas.
                    </p>
                </div>
                <div className="border-2 shadow-lg shadow-purple-500 border-purple-200 p-5 mt-8 sm:mt-0 sm:ml-3 rounded-2xl">
                    <Title
                        title="Visión"
                    />
                    <p className="mb-5">
                        Queremos ser mucho más que una piñatería: nuestro objetivo es convertirnos en la empresa líder en Bogotá y en toda Colombia
                        en artículos de fiesta, reconocidos por nuestra autenticidad, variedad y estilo único. Soñamos con seguir creciendo en el
                        mundo digital y físico, llevando la magia de nuestras decoraciones a más hogares, más sonrisas y más momentos especiales,
                        siempre con innovación y amor por lo que hacemos.
                    </p>
                    <p className="mb-5 font-bold">
                        “Las mejores celebraciones no se compran, se crean... y nosotros estamos aquí para ayudarte a hacerlas realidad.”
                    </p>
                </div>
            </div>
        </div>
    );
}
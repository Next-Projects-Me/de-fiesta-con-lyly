import { Title } from "@/components/ui/title/Title";

export default function DataTreatmentPoliticsPage() {
    return (
        <div className="border-2 shadow-lg shadow-rose-500 border-rose-200 p-5 mx-5 sm:mx-0 mt-10 sm:mt-5 mb-15 rounded-2xl sm:text-2xl">
            <Title
                title="Política de Tratamiento de Datos."
            />
            <p className="mb-5">
                Para LA EMPRESA es muy importante su derecho a la privacidad. Para proteger ese derecho, esta declaración sobre la divulgación
                de información personal explica cuáles son las prácticas en conexión con la información en línea y las opciones que usted tiene
                respecto a cómo LA EMPRESA obtiene y utiliza su información.
            </p>
            <p className="mb-5">
                En algunos casos la información se utiliza para comunicarse con el usuario, con el fin de responder de forma personalizada a sus
                inquietudes, comentarios o para atender alguna necesidad en cuanto a información o servicio.
            </p>
            <p className="mb-5">
                Los datos se utilizan para el envío futuro de información de interés a través de correo electrónico en caso de autorizar a LA EMPRESA
                al momento del registro.
            </p>

            <p className="font-semibold mb-5">Seguridad.</p>
            <p className="mb-5">
                Se han implementado los procedimientos electrónicos y administrativos para proteger y ayudar a prevenir el acceso no autorizado,
                evitar la pérdida, mal uso, alteración, acceso no autorizado y hurto de los datos personales
            </p>
            <p className="mb-5">
                El usuario será responsable de los daños y perjuicios que pueda causar a LA EMPRESA o a cualquier tercero por los usos indebidos de la página.
            </p>
            <p className="mb-5">
                Las políticas y condiciones de acceso y uso aquí establecidas y los conflictos que puedan surgir respecto de su interpretación, uso, alcance y
                terminación se rigen por la ley Colombiana y se someten a los jueces y tribunales colombianos.
            </p>

            <p className="font-semibold mb-5">Responsabilidad limitada.</p>
            <p className="mb-5">
                Sin perjuicio de lo consagrado en la legislación colombiana aplicable, LA EMPRESA no asume responsabilidad alguna, por daño o perjuicio derivado
                de la pérdida de información o utilidades, presencia de virus informáticos resultados del uso o la imposibilidad de usar el material de esta página web.
            </p>
            <p className="mb-5"></p>
            <p className="mb-5"></p>
            <p className="mb-5"></p>
            <p className="mb-5"></p>
        </div>
    );
}
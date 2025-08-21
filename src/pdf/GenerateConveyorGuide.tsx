import { Order } from '@/interfaces/order.interface';
import React, { MouseEvent } from 'react'
import { jsPDF } from 'jspdf';
import { FaFilePdf } from 'react-icons/fa6';

interface Props {
    className?: string;
    order: Order;
}

const socialNet = [
    { id: 1, icon: '/icons/instagram.png', text: '@de_fiesta_con_lyly' },
    { id: 2, icon: '/icons/whatsapp.png', text: '313 6406080' },
    { id: 3, icon: '/icons/whatsapp.png', text: '317 3866890' },
    { id: 4, icon: '/icons/location.png', text: 'Cra 58 #128b-34' },
    { id: 5, icon: '/icons/web.png', text: 'www.defiestaconlyly.com' },
];

export const GenerateConveyorGuide = ({ order, className }: Props) => {

    const generatePDF = async (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        e.stopPropagation();

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Colores
        const black = '#000000';
        const rojo = '#E30613';
        doc.setDrawColor(rojo);
        doc.setTextColor(rojo);

        // Margen
        const margin = 10;
        const width = 190;

        // Borde externo
        doc.setLineWidth(1);
        doc.roundedRect(margin, margin, width, 150, 3, 3);

        // Título
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.text('De Fiesta con', margin + 15, 25);
        doc.text('Lyly', margin + 45, 38);

        // Redes sociales
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        for (const { icon, text, id } of socialNet) {
            await new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = icon;
                img.onload = () => {
                    const w = (id === 1) ? 8 : 6;
                    const m = (id === 1) ? 4 : 5;
                    doc.addImage(img, 'PNG', margin + m, 40 + id * 8, w, w);
                    doc.text(text, margin + 13, 45 + id * 8);
                    resolve();
                };
                img.onerror = reject;
            });
        }

        // Logo círculo con texto
        // Cargar imagen
        const logo = new Image();
        logo.src = '/imgs/Logo_redondo_rojo.jpg'; // Debe estar en /public/imgs/
        logo.onload = () => {
            // Insertar logo dentro del círculo (ajusta el tamaño y posición según tu imagen)
            doc.addImage(logo, 'PNG', 115, 12, 80, 80);

            // Etiqueta DESTINATARIO
            doc.setFillColor(rojo);
            doc.setTextColor('#ffffff');
            doc.setFont('helvetica', 'bold');
            doc.roundedRect(margin + 70, 85, 50, 8, 2, 2, 'F');
            doc.text('DESTINATARIO', margin + 80, 91);

            // Campos
            doc.setTextColor(rojo);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            const campos = ['NOMBRE', 'CELULAR', 'DIRECCIÓN', '', 'CIUDAD'];
            let y = 105;
            campos.forEach((campo) => {
                const field = campo !== '' ? `${campo}:` : `${campo}`;
                doc.text(field, margin + 5, y);
                doc.line(margin + 35, y + 1, margin + 170, y + 1);
                y += 10;
            });

            doc.setFont('helvetica', 'italic');
            doc.setTextColor(black);
            doc.setFontSize(12);
            doc.text(`${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`, margin + 37, 104);
            doc.text(`${order.OrderAddress?.phone}`, margin + 37, 114);

            const address = order.OrderAddress?.address;
            if (address!.length == 70) {
                doc.text(`${address!}`, margin + 37, 124);
            } else {
                doc.text(`${address!.substring(0, 60)}`, margin + 37, 124);
                doc.text(`${address!.substring(60)}`, margin + 37, 134);
            }
            doc.text(`${order.OrderAddress?.city?.name}`, margin + 37, 144);

            doc.save(`${order.code}.pdf`);
        };
    }

    return (
        <button onClick={(e) => generatePDF(e)}
            className={`${className} bg-purple-700 text-white rounded p-2 flex flex-col justify-center items-center hover:bg-purple-900 cursor-pointer`}>
            <p className='mr-2 hidden sm:block'>Imprimir Guía</p>
            <FaFilePdf className='text-2xl' />
        </button>
    )
}

export const dynamic = 'force-dynamic';

import { getAllOrders } from "@/actions/admin/order/get-orders";
import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function AdminOrdersPage() {

    const { ok, orders = [] } = await getAllOrders();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <div className="relative overflow-x-auto">
            < Title title="Productos" />

            <div className="mb-10 mr-56">
                <table className="w-screen table-fixed">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Total
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {order.total}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {
                                            order.isPaid ?
                                                (
                                                    <>
                                                        <IoCardOutline className="text-green-800" />
                                                        <span className='mx-2 text-green-800'>Pagada</span>
                                                    </>
                                                ) :
                                                (
                                                    <>
                                                        <IoCardOutline className="text-red-800" />
                                                        <span className='mx-2 text-red-800'>No Pagada</span>
                                                    </>
                                                )
                                        }
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}
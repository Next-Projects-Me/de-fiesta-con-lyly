export const dynamic = 'force-dynamic';

import { getAllProducts } from "@/actions/admin/product/get-products";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {

    const { ok, products = [] } = await getAllProducts();

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
                                Titulo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Descripción
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id.split('-').at(-1)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4">
                                        {product.title}
                                    </td>
                                    <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4">
                                        {product.description}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        {product.price}
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
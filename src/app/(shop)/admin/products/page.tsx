export const revalidate = 0;

import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { Title } from '@/components/ui/title/Title';
import { currencyFormat } from '@/utils/currencyFormat';
import Link from 'next/link';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    return (
        <>
            <Title title="Mantenimiento de Productos" />

            <div className='flex justify-end mb-5'>
                <Link href="/admin/product/new" className='btn-primary'>
                    Nuevo Producto
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-purple-300 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Título
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Colores
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Números
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Inventario
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/product/${product.slug}`}>
                                            <ProductImage
                                                src={product.ProductImage[0]?.url}
                                                width={80}
                                                height={80}
                                                alt={product.title}
                                                className='w-20 h-20 object-cover rounded'
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/product/${product.slug}`} className='hover:underline'>
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(product.price)}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.sizes.join(', ')}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <div className='flex'>
                                            {
                                                product.colors.map(color => (
                                                    <div
                                                        key={color}
                                                        className="w-5 h-5 rounded-full ml-2"
                                                        style={{ background: color }}>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.numbers.join(', ')}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.inStock}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}
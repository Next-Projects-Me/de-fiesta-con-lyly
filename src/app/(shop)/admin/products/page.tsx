export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { getActiveSubcategories } from '@/actions/categories/get-active-subcategories';
import { AdminProductsCard } from './ui/AdminProductsCard';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const subcategories = await getActiveSubcategories();

    return (
        <>
            <Title title="Mantenimiento de Productos" className='ml-5 sm:ml-0' />
            <AdminProductsCard page={page} subcategories={subcategories!} />
        </>
    );
}
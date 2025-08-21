export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { AdminOrdersCard } from './ui/AdminOrdersCard';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function OrdersPage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    return (
        <>
            <Title title="Todas las Ordenes" className='mb-2 ml-5 mt-7 sm:mt-0 sm:ml-0' />
            <AdminOrdersCard page={page} />
        </>
    );
}
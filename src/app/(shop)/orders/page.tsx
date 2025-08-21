export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { UserOrdersCard } from './ui/UserOrdersCard';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function UserOrdersPage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    return (
        <>
            <Title title="Mis Ordenes" className='mb-2 ml-5 mt-7 sm:ml-0' />
            <UserOrdersCard page={page} />
        </>
    );
}
export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { AdminUsersCard } from './ui/AdminUsersCard';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function UsersPage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    return (
        <>
            <Title title="Todos los usuarios" className="ml-5 sm:ml-0" />
            <div className="mb-10">
                <AdminUsersCard page={page} />
            </div>
        </>
    );
}
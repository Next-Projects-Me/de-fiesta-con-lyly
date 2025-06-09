export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';
import { getPaginatedUsers } from '@/actions/users/get-paginated-users';
import { Pagination } from '@/components/ui/pagination/Pagination';

export default async function UsersPage() {

    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <Title title="Todas los usuarios" />

            <div className="mb-10">
                <UsersTable users={users} />
                <Pagination totalPages={1} />
            </div>
        </>
    );
}
export const dynamic = 'force-dynamic';

import { getAllUsers } from "@/actions/admin/user/get-users";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {

    const { ok, users = [] } = await getAllUsers();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <Title title="Usuarios" />

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Correo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Rol
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id.split('-').at(-1)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4">
                                        {user.name}
                                    </td>
                                    <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        {user.role}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
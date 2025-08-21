import { getUserAddress } from "@/actions/address/get-user-address";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ProfileAddressForm } from "./ui/ProfileAddressForm";
import { getDepartments } from "@/actions/departments/get-departments";
import { getCities } from "@/actions/cities/get-cities";
import { ProfileInformation } from "./ui/ProfileInformation";
import { Toaster } from "sonner";

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
        redirect('/')
    }

    const address = await getUserAddress(session.user.id) ?? undefined;
    const departments = await getDepartments();
    const cities = await getCities();

    return (
        <div>
            <Toaster richColors position="bottom-right" />
            <ProfileInformation fullname={session.user.name} email={session.user.email} />
            <ProfileAddressForm address={address!} departments={departments} cities={cities} />
        </div>
    );
}
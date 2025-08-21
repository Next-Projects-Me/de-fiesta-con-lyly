export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | null;
    password: string;
    roleId: number;
    isActive: boolean;
    image?: string | null;
}
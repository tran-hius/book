export type UserRole = "admin" | "customer";

export interface UserType {
    id?: number;
    username: string;
    email: string;
    password?: string;
    fullName: string;
    role: UserRole;
    phone?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

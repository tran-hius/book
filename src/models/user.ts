import { UserRole, UserType } from "../types/user.type.js";

export class User implements UserType {
    public id?: number | undefined;
    public username: string;
    public email: string;
    public password?: string | undefined;
    public fullName: string;
    public role: UserRole;
    public phone?: string | undefined;
    public avatarUrl?: string | undefined;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        username: string,
        email: string,
        fullName: string,
        role: UserRole,
        createdAt: Date,
        updatedAt: Date,
        id?: number,
        password?: string,
        phone?: string,
        avatarUrl?: string
    ) {
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.password = password;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
    }

    static toObject(raw: Record<string, any>): User {
        return new User(
            raw.username,
            raw.email,
            raw.full_name,
            raw.role as UserRole,
            raw.created_at,
            raw.updated_at,
            raw.id,
            raw.password,
            raw.phone,
            raw.avatar_url
        );
    }

    isAdmin(): boolean {
        return this.role === "admin";
    }

    isCustomer(): boolean {
        return this.role === "customer";
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            full_name: this.fullName,
            role: this.role,
            phone: this.phone,
            avatar_url: this.avatarUrl,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}

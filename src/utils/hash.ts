import argon2 from "argon2"

export class Hasher {
    static hashPassword(password: string): Promise<string> {
        return argon2.hash(password)
    }

    static verify(password: string, passwordHash: string): Promise<boolean> {
        return argon2.verify(passwordHash, password)
    }
}
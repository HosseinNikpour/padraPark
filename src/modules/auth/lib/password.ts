import bcrypt from "bcrypt";

const SALT = 10;

export async function hashPassword(
    password: string
) {

    return bcrypt.hash(password, SALT);

}

export async function verifyPassword(
    password: string,
    hash: string
) {

    return bcrypt.compare(password, hash);

}
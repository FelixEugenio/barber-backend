import cookie from 'cookie-parser';

export const cookieConfig = {

    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
}